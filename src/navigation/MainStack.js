import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import DrawerStack from './DrawerStack';

const Stack = createStackNavigator();
const MainStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen component={LoginScreen} name="Login" options={{
                headerShown:false
            }} />
            <Stack.Screen component={RegisterScreen} name="Register" options={{
                headerShown:false
            }} />
            <Stack.Screen component={ForgotPasswordScreen} name="ForgotPassword" options={{
                headerShown:false
            }} />
            <Stack.Screen component={DrawerStack} name="DrawerStack" options={{
                headerShown:false
            }} />
        </Stack.Navigator>
     );
}


export default MainStack;