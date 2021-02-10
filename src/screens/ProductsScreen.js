import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import Header from "../components/Header";
import axios from "axios";
import { Avatar } from "react-native-paper";
import { PRIMARY_COLOR } from "../constants/cssConstants";
import filter from "lodash.filter";
const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await axios
      .get(`https://randomuser.me/api/?seed=1&page=1&results=20`)
      .then((response) => response.data.results);
    setProducts(data);
    setFullData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%",
        }}
      />
    );
  };

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setProducts(filteredData);
    setQuery(text);
  };
  
  const contains = ({ name, email }, query) => {
    const { first, last } = name;
  
    if (first.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }
  
    return false;
  };
  return (
    <>
      <View style={styles.container}>
        {/* <Image
          source={require("../../assets/assets/AppBg.png")}
          style={styles.backgroundImg}
        /> */}
        <Header navigation={navigation} />
        <View style={styles.productList}>
          {loading && (
            <ActivityIndicator size="large" animating color={PRIMARY_COLOR} />
          )}
          {products && !loading && (
            <>
              <View>
                <Text style={styles.mainTitle}>Tous les produits</Text>
                <TextInput
                  onChangeText={(text) => handleSearch(text)}
                  style={styles.searchInput}
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder="Rechercher..."
                />
              </View>
              <FlatList
                data={products}
                keyExtractor={(item) => item.email}
                ItemSeparatorComponent={renderSeparator}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress={() => alert("Item pressed!")}>
                      <View
                        style={{
                          flexDirection: "row",
                          padding: 16,
                          alignItems: "center",
                        }}
                      >
                        <Avatar.Image
                          source={{ uri: item.picture.thumbnail }}
                          size={84}
                          style={{ marginRight: 16 }}
                        />
                        <Text
                          category="s1"
                          style={{
                            color: "#000",
                          }}
                        >{`${item.name.first} ${item.name.last}`}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: Constants.statusBarHeight
  },
  backgroundImg: {
    resizeMode: "contain",
    position: "absolute",
  },
  productList: {
    paddingHorizontal: 30,
    paddingVertical: Constants.statusBarHeight,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 50,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
  },
});

export default ProductsScreen;
