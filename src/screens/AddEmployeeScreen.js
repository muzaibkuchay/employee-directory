import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Alert, } from 'react-native';
import EmployeContext from '../utils/EmployeeContext';
import CustomTextInput from '../components/input';


const AddEmployeeScreen = ({ navigation }) => {
    const { empolyes, setEmpolyes } = useContext(EmployeContext);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: ''

    })

    const handleInputChange = (fieldName, value) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [fieldName]: value
        }));
    };

    const handleAddEmployee = () => {
        console.log('user data', userData.firstName);
        const newEmployee = {
            name: {
                first: userData.firstName,
                last: userData.lastName
            },
            email: userData.email
        };
        setEmpolyes([...empolyes, newEmployee]);
        navigation.goBack();
        Alert.alert('Employee added successfully.');
    }

    return (
        <View style={styles.container}>
            <View>
                <CustomTextInput handleInputChange={(text) => handleInputChange('firstName', text)} inputType='name' label='First Name' placeholder='e.g Jhon...' />
                <CustomTextInput handleInputChange={(text) => handleInputChange('lastName', text)} inputType='name' label='Last Name' placeholder='e.g Doe...' />
                <CustomTextInput handleInputChange={(text) => handleInputChange('email', text)} inputType='email' label='Email' placeholder='e.g Jhondoe@yahoo.com' />
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