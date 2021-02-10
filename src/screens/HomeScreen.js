import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import { PRIMARY_COLOR } from "../constants/cssConstants";
import { Row, Column as Col } from "react-native-flexbox-grid";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../../assets/assets/AppBg.png")}
          style={styles.backgroundImg}
        />
        <ScrollView>
          <Header navigation={navigation}/>
          <View style={styles.content}>
            <Text style={styles.mainTitle}>Retrouvez</Text>
            <Text style={styles.mainTitle}>Vos meilleurs plats</Text>
          </View>
          <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.cardActive}>
                <Text style={styles.cardTextActive}>Sandwichs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryCard}>
                <Text style={styles.categoryText}>Kebabs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryCard}>
                <Text style={styles.categoryText}>Gastronomie</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.productContainer}>
            <Text style={styles.containerTitle}>Vos plats</Text>
            <TouchableOpacity style={styles.moreBtn}>
              <Text style={styles.moreBtnText}>Voir tout</Text>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.productCard}>
                <Image
                  source={require("../../assets/img/sandwich.png")}
                  style={styles.productImg}
                />
                <Text style={styles.productTitle}>Crudité poulet</Text>
                <Text style={styles.shopName}>
                  Snack bar Front de mer Sainte-Marie
                </Text>
                <Text style={styles.productPrice}>2,50 €</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.productCard}>
                <Image
                  source={require("../../assets/img/sandwich.png")}
                  style={styles.productImg}
                />
                <Text style={styles.productTitle}>Crudité poulet</Text>
                <Text style={styles.shopName}>
                  Snack bar Front de mer Sainte-Marie
                </Text>
                <Text style={styles.productPrice}>2,50 €</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.shopsContainer}>
            <Text style={styles.containerTitle}>
              Boutiques près de chez vous
            </Text>
            <TouchableOpacity style={styles.moreBtn}>
              <Text style={styles.moreBtnText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.shopList}>
            <Row size={12}>
              <Col sm={6}>
                <TouchableOpacity>
                  <View style={styles.shopCard}>
                    <Image
                      source={require("../../assets/img/fork-knife.png")}
                      style={styles.shopImg}
                    />
                    <Text style={styles.shopTitle}>
                      Snack bar Front de mer Sainte-Marie
                    </Text>
                  </View>
                </TouchableOpacity>
              </Col>
            </Row>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImg: {
    resizeMode: "contain",
    position: "absolute",
    width: Dimensions.get('window').width
  },
  content: {
    marginHorizontal: 30,
  },
  mainTitle: {
    color: PRIMARY_COLOR,
    fontSize: 32,
    fontWeight: "700",
  },
  categoryContainer: {
    marginLeft: 30,
    marginVertical: 30,
  },
  categoryCard: {
    width: 120,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  categoryText: {
    color: PRIMARY_COLOR,
  },
  cardActive: {
    width: 120,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  cardTextActive: {
    color: "#FFFFFF",
  },
  productContainer: {
    marginLeft: 30,
    marginVertical: 15,
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    marginRight: 10,
  },
  productImg: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  productTitle: {
    fontSize: 22,
    color: "#727272",
    fontWeight: "bold",
  },
  shopName: {
    fontSize: 10,
    color: "#C5C5C5",
    width: 110,
    textAlign: "center",
  },
  productPrice: {
    color: PRIMARY_COLOR,
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  moreBtn: {
    backgroundColor: PRIMARY_COLOR,
    marginBottom: 10,
    borderRadius: 30,
    width: 100,
    alignItems: "center",
    padding: 8,
  },
  moreBtnText: {
    color: "#FFFFFF",
  },
  containerTitle: {
    fontSize: 24,
    color: PRIMARY_COLOR,
    marginVertical: 10,
  },
  shopsContainer: {
    marginHorizontal: 30,
  },
  shopCard: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    margin: 5,
  },
  shopTitle: {
    textAlign: "center",
    color: "#C5C5C5",
    width: 100,
    marginTop: 10,
  },
  shopImg: {
    resizeMode: "contain",
    width: 100,
    height: 100,
  },
  shopList: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
