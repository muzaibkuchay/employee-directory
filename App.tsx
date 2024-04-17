
import React from 'react';
import { SafeAreaView } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { EmpolyeProvider } from '../EmployeeDirectory/src/utils/EmployeeContext';

const App = () => {
  return (
    <EmpolyeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </EmpolyeProvider>

  )
}
export default App;
