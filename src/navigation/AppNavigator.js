import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeListScreen from '../screens/EmployeeListScreen';
import AddEmployeeScreen from '../screens/AddEmployeeScreen';
import EditEmployeeScreen from '../screens/EditEmployeeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="EmployeeList"
                    component={EmployeeListScreen}
                    options={{ title: 'Employee List' }}
                />
                <Stack.Screen
                    name="AddEmployee"
                    component={AddEmployeeScreen}
                    options={{ title: 'Add Employee' }}
                />
                <Stack.Screen
                    name="EditEmployee"
                    component={EditEmployeeScreen}
                    options={{ title: 'Edit Employee' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator;