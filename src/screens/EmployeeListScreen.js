import React, { useState, useContext, useCallback, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';

import EmployeContext from '../utils/EmployeeContext';
import { fetchRandomUsers } from '../utils/api';

export default EmployeeListScreen = () => {
    const animationRefs = useRef([]);
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [count, setCount] = useState(10);
    const { empolyes, search, setSearch, setEmpolyes } = useContext(EmployeContext);

    const handleDelEmploye = (index) => {
        animationRefs.current[index].play();
        // Wait for animation to finish before updating state
        setTimeout(() => {
            const updatedEmployes = [...empolyes];
            updatedEmployes.splice(index, 1);
            setEmpolyes(updatedEmployes);
        }, 2500);
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
    const onAnimationFinish = (index) => {
        animationRefs.current[index].reset();
    };
    const renderEmpolyeCard = useCallback(({ item, index }) => {
        const { picture: { large } = {} } = item;
        const uri = large ? large : "https://reactnative.dev/img/tiny_logo.png";
        const { title = '', first, last } = item.name;
        return (<View style={styles.empolyeItem}>
            <View style={styles.imageContainer}>
                <View>
                    <Text style={styles.empText}>{`${title} ${first} ${last}`}</Text>
                    <Text style={styles.empText}>{`${item.email}`}</Text>
                </View>
                <Image
                    resizeMethod={'auto'}
                    progressiveRenderingEnabled
                    style={styles.image}
                    source={{
                        uri: `${uri}`
                    }} />
            </View>
            <View style={styles.btnContainer}>
                <Button title='Edit' onPress={() => navigation.navigate('EditEmployee', { employeeIndex: index })} />
                <TouchableOpacity onPress={() => handleDelEmploye(index)} style={styles.deleteBtn}>
                    <LottieView
                        ref={ref => animationRefs.current[index] = ref}
                        source={require('../json/animations/delete.json')}
                        loop={false}
                        autoPlay={false}
                        onAnimationFinish={() => onAnimationFinish(index)}
                        style={styles.animation}
                    />
                </TouchableOpacity>

            </View>
        </View >)
    }
    )


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
        marginVertical: 13,
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
        fontWeight: '500',
        color: '#36454F',

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
        alignItems: 'center',
        marginTop: 10,
    },
    deleteBtn: {
        width: '15%',
        justifyContent: 'center',
        borderWidth: 0.8,
        borderRadius: 2,
        borderColor: '#CCC',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0)',
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 0.3,
        elevation: 10,
        color: '#000'
    },
    animation: {
        width: 28,
        height: 28,
        aspectRatio: 1,

    },
    focused: {
        borderColor: '#318CE7'
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCC'
    }

})