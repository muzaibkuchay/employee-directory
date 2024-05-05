import React, { useState, useContext, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';

import EmployeContext from '../utils/EmployeeContext';
import { fetchRandomUsers } from '../utils/api';

export default EmployeeListScreen = () => {
    const navigation = useNavigation();
    const [isDelete, setIsDelete] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [count, setCount] = useState(10);
    const { empolyes, search, setSearch, setEmpolyes } = useContext(EmployeContext);

    const handleDelEmploye = (index) => {
        const updatedEmployes = [...empolyes];
        updatedEmployes.splice(index, 1);
        setEmpolyes(updatedEmployes);
        setIsDelete(index);
    }

    const handleAddEmployeeFnc = () => {
        navigation.navigate('AddEmployee');
        setIsFocused(false);
        setSearch('');
    }
    const handleEndReached = async () => {
        const updatedCount = count + 10;
        setCount(updatedCount);
        const randomusers = await fetchRandomUsers(count);
        setEmpolyes((prevEmp) => [...prevEmp, ...randomusers]);
    }

    const renderEmpolyeCard = useCallback(({ item, index }) =>
    (<View style={styles.empolyeItem}>
        <Text style={styles.empText}>{`${item.name.first} ${item.name.last}`}</Text>
        <Text style={styles.empText}>{`${item.email}`}</Text>
        <View style={styles.btnContainer}>
            <Button title='Edit' onPress={() => navigation.navigate('EditEmployee', { employeeIndex: index })} />
            {
                isDelete === index ? (
                    <LottieView
                        source={require('../json/animations/delete.json')}
                        autoPlay
                        loop={false}
                        onAnimationFinish={() => {
                            handleDelEmploye(null);
                            setIsDelete(null);
                        }}
                        style={styles.animation}
                    />
                )
                    :
                    (<Button title='REMOVE' color={'#D2042D'} onPress={() => handleDelEmploye(index)} />)
            }

        </View>
    </View >))


    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.searchTextInput, isFocused && styles.focused]}
                placeholderTextColor="#999"
                placeholder='Search...'
                value={search}
                onChangeText={setSearch}
                onFocus={() => setIsFocused(true)}
                multiline={false}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={empolyes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderEmpolyeCard}
                onEndReached={handleEndReached}
                refreshing={true}
            />
            <Button title='Add Employee' onPress={handleAddEmployeeFnc} />
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',

    },
    empolyeItem: {
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0)',
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 0.3,
        elevation: 10,
        borderLeftWidth: 8,
        backgroundColor: '#FFF',
    },
    empText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000'
    },
    searchTextInput: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        shadowColor: 'rgba(0, 0, 0, 0)',
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: '#FFF',
        color: '#000'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    animation: {
        width: '10%',
        height: '10%',
        aspectRatio: 1,

    },
    focused: {
        borderColor: '#318CE7'
    }

})