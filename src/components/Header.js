import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import { PRIMARY_COLOR } from "../constants/cssConstants";
import { DrawerActions } from '@react-navigation/native';
const Header = ({navigation}) => {
  return (
    <>
      <View style={styles.statusBar}></View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
          <Icon name="menu" color={PRIMARY_COLOR } size={32} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight
  },
  header: {
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

export default Header;
