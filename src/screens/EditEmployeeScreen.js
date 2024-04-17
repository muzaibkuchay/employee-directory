import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import EmployeContext from '../utils/EmployeeContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditEmployeeScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { employeeIndex } = route.params;
    const { empolyes, setEmpolyes } = useContext(EmployeContext);

    const [firstName, setFirstName] = useState(empolyes[employeeIndex].name.first);
    const [lastName, setLastName] = useState(empolyes[employeeIndex].name.last);
    const [email, setEmail] = useState(empolyes[employeeIndex].email);

    const handleEditEmployee = () => {
        if (firstName && lastName && email) {
            const updateEmployees = [...empolyes];
            updateEmployees[employeeIndex] = {
                name: {
                    first: firstName,
                    last: lastName
                },
                email: email,
            };
            setEmpolyes(updateEmployees);
            Alert.alert('Employee updated successfully.');
            navigation.goBack();


        }
        else {
            Alert.alert('Unable to update the employee details');
        }

    }
    return (
        <View style={styles.container}>
            <View>
                <TextInput style={styles.textInput}
                    placeholder='First Name...'
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput style={styles.textInput}
                    placeholder='Last Name...'
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput style={styles.textInput}
                    placeholder='Email...'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
            </View>
            <Button title='Save Changes' onPress={handleEditEmployee} />

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
})

export default EditEmployeeScreen;