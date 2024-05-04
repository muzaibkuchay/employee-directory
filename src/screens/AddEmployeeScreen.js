import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Alert, } from 'react-native';
import EmployeContext from '../utils/EmployeeContext';
import CustomTextInput from '../components/input';


const AddEmployeeScreen = ({ navigation }) => {
    const { empolyes, setEmpolyes } = useContext(EmployeContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(null);

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
                <CustomTextInput label='First Name' placeholder='e.g Jhon...' value={firstName} onChangeText={setFirstName} />
                <CustomTextInput label='Last Name' placeholder='e.g Doe...' value={lastName} onChangeText={setLastName} />
                <CustomTextInput label='Email' placeholder='e.g jhondoe@yahoo.com' value={email} onChangeText={setEmail} />
            </View>
            <Button title='Add Employee' onPress={handleAddEmployee} />
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
})

export default AddEmployeeScreen;