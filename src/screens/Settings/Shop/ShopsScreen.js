import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_COLOR } from "../../../constants/cssConstants";
import { decodeToken } from "../../../services/AuthService";
import { fetchMyShops } from "../../../services/ShopService";
import Constants from "expo-constants";
import { Avatar, List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ShopsScreen = ({ navigation }) => {
  const [shops, setShops] = useState();
  const [loading, setLoading] = useState(false);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const decodedToken = decodeToken(await AsyncStorage.getItem("token"));
      const data = await fetchMyShops(decodedToken.userid).then(
        (response) => response.data
      );
      setShops(data);
      setLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const renderItem = ({ item }) => {
    return (
        <List.Item
          title={item.name}
          titleStyle={{
            color: PRIMARY_COLOR,
          }}
          onPressIn={() => navigation.navigate('ShowSingleShop', {shopid:item.id})}
          style={styles.productItem}
          left={() => <Avatar.Image source={{ uri: item.image }} />}
          right={() => <List.Icon style={{alignSelf:'center'}} icon="chevron-right" color={PRIMARY_COLOR} />}
          onPress={() => {}}
        />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewShop')}>
        <Icon name="plus" size={32} color="#FFFFFF" />
      </TouchableOpacity>
      {loading && (
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <ActivityIndicator
            animating
            size="large"
            color={PRIMARY_COLOR}
            style={{ alignSelf: "center" }}
          />
        </View>
      )}
      <List.Section>
      {shops && !loading && Object.keys(shops).length > 0 ? (
        <>
        <List.Subheader>Vos boutiques</List.Subheader>
        <FlatList
          data={shops}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        </>
      )
    :
    !loading && (
      <>
      <List.Subheader>Vos boutiques</List.Subheader>
      <Text style={styles.noShop}>Aucune boutique trouvée</Text>
    
      </>
    )
    }
      </List.Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  productItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  addBtn: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: PRIMARY_COLOR,
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  noShop:{
    textAlign:'center',
    color:"#727272"
  }
});

export default ShopsScreen;
