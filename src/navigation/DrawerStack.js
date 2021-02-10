import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AppStack from "./AppStack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import { Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { logoutApp } from "../services/AuthService";
import { PRIMARY_COLOR } from "../constants/cssConstants";

const MainDrawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView style={styles.drawerContent}>
          <View style={styles.userSection}>
            <Text style={styles.drawerTitle}>Willy NATAN</Text>
            <Text style={styles.userRole}>Utilisateur</Text>
          </View>
          <Drawer.Section />
          <TouchableOpacity style={styles.drawerNav} onPress={() => props.navigation.navigate('Home')}  >
            <Icon name="home" size={32} color={PRIMARY_COLOR} />
            <Text style={styles.drawerNavText}>Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerNav} onPress={() => props.navigation.navigate('Products')} >
            <Icon name="shopping" size={32} color={PRIMARY_COLOR} />
            <Text style={styles.drawerNavText}>Tous les produits</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerNav}>
            <Icon name="store" size={32} color={PRIMARY_COLOR} />
            <Text style={styles.drawerNavText}>Toutes les boutiques</Text>
          </TouchableOpacity>
        </DrawerContentScrollView>
      </View>
      <View style={styles.drawerContent}>
        <Drawer.Section />
        <TouchableOpacity style={styles.drawerNav} onPress={() => props.navigation.navigate('Settings')} >
          <Icon name="cog" size={32} color={PRIMARY_COLOR} />
          <Text style={styles.drawerNavText}>Paramètres</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerNav} onPress={() => {
          logoutApp()
          props.navigation.navigate('Login')
        }}  >
          <Icon name="logout" size={32} color={PRIMARY_COLOR} />
          <Text style={styles.drawerNavText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const DrawerStack = () => {
  return (
    <MainDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <MainDrawer.Screen component={AppStack} name="AppStack" />
    </MainDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
  drawerContent: {
    padding: 30,
  },
  userSection: {
    marginBottom: 15,
  },
  drawerTitle: {
    fontSize: 26,
    color:PRIMARY_COLOR
  },
  userRole: {
    color: "#727272",
    fontSize: 14,
  },
  drawerNav: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  drawerNavText: {
    color: "#727272",
    marginLeft: 10,
    fontSize: 14,
  },
});

export default DrawerStack;
