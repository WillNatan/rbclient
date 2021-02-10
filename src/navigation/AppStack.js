import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import SingleShop from '../screens/SingleShop';
import SingleProduct from '../screens/SingleProduct';
import SettingsScreen from '../screens/SettingsScreen';
import { PRIMARY_COLOR } from '../constants/cssConstants';
import ShopsScreen from '../screens/Settings/Shop/ShopsScreen';
import AddShopScreen from '../screens/Settings/Shop/AddShopScreen';
import ShowSingleShop from '../screens/Settings/Shop/ShowSingleShop';

const Stack = createStackNavigator();

const AppStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen component={HomeScreen} name={"Home"} options={{
                headerShown:false
            }}   />
            <Stack.Screen component={ProductsScreen} name={"Products"} options={{
                headerShown:false
            }}   />
            <Stack.Screen component={SingleShop} name={"SingleShop"} options={{
                headerShown:false
            }}   />
            <Stack.Screen component={SettingsScreen} name={"Settings"} options={{
                title:"Paramètres",
                headerStyle: {
                    backgroundColor: PRIMARY_COLOR,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    color:'#FFFFFF'
                  },
                headerTitleAlign: true
            }} 
            />
            <Stack.Screen component={ShopsScreen} name={"ShopsSettings"} options={{
                title:"Boutiques",
                headerStyle: {
                    backgroundColor: PRIMARY_COLOR,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    color:'#FFFFFF'
                  },
                headerTitleAlign: true
            }}   />
            <Stack.Screen component={AddShopScreen} name={"NewShop"} options={{
                title:"Nouvelle boutique",
                headerStyle: {
                    backgroundColor: PRIMARY_COLOR,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    color:'#FFFFFF'
                  },
                headerTitleAlign: true
            }}   />
            <Stack.Screen component={ShowSingleShop} name={"ShowSingleShop"} options={{
                title:"Détails boutique",
                headerStyle: {
                    backgroundColor: PRIMARY_COLOR,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    color:'#FFFFFF'
                  },
                headerTitleAlign: true
            }}   />
            <Stack.Screen component={SingleProduct} name={"SingleProduct"} options={{
                headerShown:false
            }}   />
        </Stack.Navigator>
     );
}
 
export default AppStack;