import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import Header from "../components/Header";
import { PRIMARY_COLOR } from "../constants/cssConstants";

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Compte</List.Subheader>
        <List.Item
          title="Gestion du compte"
          titleStyle={{
            color:PRIMARY_COLOR
        }}
          left={() => <List.Icon icon="account" color={PRIMARY_COLOR} />}
          right={() => <List.Icon icon="chevron-right" color={PRIMARY_COLOR} />}
          onPress={() => {}}
        />
        <List.Item
          title="Mot de passe"
          titleStyle={{
              color:PRIMARY_COLOR
          }}
          left={() => <List.Icon color={PRIMARY_COLOR} icon="lock" />}
          right={() => <List.Icon icon="chevron-right" color={PRIMARY_COLOR} />}
          onPress={() => {}}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Application</List.Subheader>
        <List.Item
          title="Boutiques"
          titleStyle={{
            color:PRIMARY_COLOR
        }}
          left={() => <List.Icon icon="store" color={PRIMARY_COLOR} />}
          right={() => <List.Icon icon="chevron-right" color={PRIMARY_COLOR} />}
          onPress={() => navigation.navigate("ShopsSettings")}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Support</List.Subheader>
        <List.Item
          title="Rapporter un problème"
          titleStyle={{
            color:PRIMARY_COLOR
        }}
          left={() => <List.Icon icon="alert" color={PRIMARY_COLOR} />}
          right={() => <List.Icon icon="chevron-right" color={PRIMARY_COLOR} />}
          onPress={() => {}}
        />
        <List.Item
          title="Version"
          titleStyle={{
            color:PRIMARY_COLOR
        }}
          left={() => <List.Icon icon="cellphone-information" color={PRIMARY_COLOR} />}
          right={() => <View style={{alignItems:'center', justifyContent:'center', marginRight:30, }} ><Text style={{color:'#727272'}}>1.0.0</Text></View>}
        />
        <List.Item
          title="Termes et conditions"
          titleStyle={{
            color:PRIMARY_COLOR
        }}
          left={() => <List.Icon icon="file-account" color={PRIMARY_COLOR} />}
          right={() => <List.Icon icon="chevron-right" color={PRIMARY_COLOR} />}
        />
        <List.Item
          title="Politique de confidentialité"
          titleStyle={{
            color:PRIMARY_COLOR
        }}
          left={() => <List.Icon icon="file-document-edit" color={PRIMARY_COLOR} />}
          right={() => <List.Icon icon="chevron-right" color={PRIMARY_COLOR} />}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    marginHorizontal: 30,
  },
  mainTitle: {
    color: PRIMARY_COLOR,
    fontSize: 32,
    fontWeight: "700",
  },
});

export default SettingsScreen;
