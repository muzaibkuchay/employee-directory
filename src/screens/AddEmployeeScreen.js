import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert,Text } from 'react-native';
import EmployeContext from '../utils/EmployeeContext';


const AddEmployeeScreen = ({ navigation }) => {
    const { empolyes, setEmpolyes } = useContext(EmployeContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddEmployee = () => {
        if (firstName && lastName && email) {
            const newEmployee = {
                name: {
                    first: firstName,
                    last: lastName
                },
                email: email
            };
            setEmpolyes([...empolyes, newEmployee]);
            navigation.goBack();
            Alert.alert('Employee added successfully.');

        }
        else {
            Alert.alert('All details are required.');
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
            <Button title='Add Employee' onPress={handleAddEmployee}  />

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

export default AddEmployeeScreen;