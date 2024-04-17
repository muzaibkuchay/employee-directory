import React, { useContext, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EmployeContext from '../utils/EmployeeContext';

export default EmployeeListScreen = () => {
    const { empolyes, search, setSearch, setEmpolyes } = useContext(EmployeContext);
    const navigation = useNavigation();

    const handleDelEmploye = (index) => {
        const updatedEmployes = [...empolyes];
        updatedEmployes.splice(index, 1);
        setEmpolyes(updatedEmployes);

    }

    const renderEmpolyeCard = useCallback(({ item, index }) =>
    (<View style={stlyes.empolyeItem}>
        <Text style={stlyes.empText}>{`${item.name.first} ${item.name.last}`}</Text>
        <Text style={stlyes.empText}>{`${item.email}`}</Text>
        <View style={stlyes.btnContainer}>
            <Button title='Edit'
                onPress={() => navigation.navigate('EditEmployee', { employeeIndex: index })}
            />
            <Button title='REMOVE'
                onPress={() => handleDelEmploye(index)}
                color={'#D22B2B'}
            />
        </View>
    </View>))


    return (
        <View style={stlyes.container}>
            <TextInput
                style={stlyes.searchTextInput}
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

    )

}

const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF'
    },
    empolyeItem: {
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 4,
    },
    empText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000'
    },
    searchTextInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }

})