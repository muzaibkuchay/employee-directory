import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import EmployeContext from '../utils/EmployeeContext';
import CustomTextInput from '../components/input';

import LottieView from 'lottie-react-native';
var height = Dimensions.get('window').height;

const AddEmployeeScreen = ({ navigation }) => {
    const { empolyes, setEmpolyes } = useContext(EmployeContext);
    const [isSuccess, setIsSuccess] = useState(false);
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
        const newEmployee = {
            name: {
                first: userData.firstName,
                last: userData.lastName
            },
            email: userData.email
        };
        setEmpolyes([...empolyes, newEmployee]);
        setIsSuccess(true);

    }

    return (
        <React.Fragment>
            <View style={[styles.container, isSuccess && styles.lottieCont]}>
                <View>
                    <CustomTextInput handleInputChange={(text) => handleInputChange('firstName', text)} inputType='name' label='First Name' placeholder='e.g Jhon...' />
                    <CustomTextInput handleInputChange={(text) => handleInputChange('lastName', text)} inputType='name' label='Last Name' placeholder='e.g Doe...' />
                    <CustomTextInput handleInputChange={(text) => handleInputChange('email', text)} inputType='email' label='Email' placeholder='e.g Jhondoe@yahoo.com' />
                </View>
                <Button title='Add Employee' onPress={handleAddEmployee} />

            </View>

            {
                isSuccess && (
                    <View style={styles.successCont}>
                        <LottieView
                            source={require('../json/animations/success.json')}
                            autoPlay
                            loop={false}
                            onAnimationFinish={() => {
                                setIsSuccess(false);
                                navigation.goBack();
                            }}
                            style={styles.animation}
                        />
                    </View>

                )
            }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    animation: {
        flex: 0.5,
    },
    lottieCont: {
        padding: 0
    },
    successCont: {
        height: height,
        backgroundColor: '#FFF'
    }
})

export default AddEmployeeScreen;