import React, { useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EmployeContext from '../utils/EmployeeContext';

import LottieView from 'lottie-react-native';

export default EmployeeListScreen = () => {
    const [isDelete, setIsDelete] = useState(null);
    const { empolyes, search, setSearch, setEmpolyes } = useContext(EmployeContext);
    const navigation = useNavigation();

    const handleDelEmploye = (index) => {
        setIsDelete(index);
        const updatedEmployes = [...empolyes];
        updatedEmployes.splice(index, 1);
        setEmpolyes(updatedEmployes);


    }

    const renderEmpolyeCard = useCallback(({ item, index }) =>
    (<View style={styles.empolyeItem}>
        <Text style={styles.empText}>{`${item.name.first} ${item.name.last}`}</Text>
        <Text style={styles.empText}>{`${item.email}`}</Text>
        <View style={styles.btnContainer}>
            <Button title='Edit' onPress={() => navigation.navigate('EditEmployee', { employeeIndex: index })}/>
            {
                isDelete === index ? (
                    <LottieView
                        source={require('../json/animations/delete.json')}
                        autoPlay
                        loop={false}
                        onAnimationFinish={() => {
                            setIsDelete(null);
                            handleDelEmploye(null);
                        }}
                        style={styles.animation}
                    />
                )
                    :
                    (<Button title='REMOVE' color={'#D2042D'} onPress={() => handleDelEmploye(index)}/>)
            }

        </View>
    </View >))


    return (
        <React.Fragment>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchTextInput}
                    placeholder='Search...'
                    value={search}
                    onChangeText={setSearch}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={empolyes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderEmpolyeCard}
                />
                <Button
                    title='Add Employee'
                    onPress={() => navigation.navigate('AddEmployee')}

                />
            </View>
        </React.Fragment>


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
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
        shadowColor: 'rgba(0, 0, 0, 0)',
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 0.3,
        elevation: 10,
        backgroundColor: '#FFF',
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

})