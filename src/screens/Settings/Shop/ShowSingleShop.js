import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Dialog,
  List,
  Paragraph,
  Portal,
  TextInput,
} from "react-native-paper";
import { INFO_COLOR, PRIMARY_COLOR } from "../../../constants/cssConstants";
import { findOneShop, addAddress, editAddress } from "../../../services/ShopService";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ShowSingleShop = ({ navigation, route }) => {
  const [shop, setShop] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingAddr, setLoadingAddr] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const params = route.params;
  const [errAddr, setErrAddr] = useState();
  const [addressBody, setAddressBody] = useState({
    shopid: params.shopid,
    street: "",
    number: "",
    postalCode: "",
    city: "",
  });

  const scrollViewRef = useRef();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);


  const fetchShop = async () => {
    try {
      setLoading(true);
      const data = await findOneShop(params.shopid).then(
        (response) => response.data
      );
      setShop(data);
      setLoading(false);
    } catch (e) {
      console.log(e.response.data);
      setLoading(false);
    }
  };

  const theme = {
    colors: {
      primary: PRIMARY_COLOR,
      background: "#FFFFFF",
    },
  };

  const handleAddAddress = async () => {
    try {
      setErrAddr();
      setLoadingAddr(true);
      await addAddress(addressBody);
      setLoadingAddr(false);
      setAddMode(false);
      setAddressBody({
        shopid: params.shopid,
        street: "",
        number: "",
        postalCode: "",
        city: "",
      });
      fetchShop();
    } catch (e) {
      setErrAddr(e.response.data);
      setLoadingAddr(false);
    }
  };

  const handleEditAddress = async () => {
    try {
      setErrAddr();
      setLoadingAddr(true);
      await editAddress(addressBody)
      setLoadingAddr(false);
      setEditMode(false);
      setAddressBody({
        shopid: params.shopid,
        street: "",
        number: "",
        postalCode: "",
        city: "",
      });
      fetchShop();
    } catch (e) {
      if(e.response.status === 400){
      setErrAddr(e.response.data);
      setLoadingAddr(false);
      }
      else{
        alert('Une erreur est survenue')
      }
    }
  }

  

  useEffect(() => {
    fetchShop();
  }, []);
  return (
    <View style={styles.container}>
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" animating color={PRIMARY_COLOR} />
        </View>
      )}
      {shop && !loading && (
        <ScrollView
        ref={scrollViewRef}
        >
          <View style={styles.shopMainContent}>
            <View style={styles.imgContent}>
              <Image
                source={{
                  uri:
                    "https://png.pngtree.com/png-vector/20190322/ourlarge/pngtree-shop-logo-vector-template-design-illustration-png-image_860079.jpg",
                }}
                style={styles.shopImg}
              />
            </View>
            <Text style={styles.shopName}>{shop.name}</Text>
            <List.Section>
              <List.Subheader>Informations</List.Subheader>
              <List.Item
                title="Numéro de téléphone"
                description={
                  shop.phone ? shop.phone : "Aucun numéro de téléphone"
                }
                left={(props) => (
                  <List.Icon {...props} icon="phone" color={PRIMARY_COLOR} />
                )}
                right={(props) => (
                  <TouchableOpacity onPress={() => alert("edit")}>
                    <List.Icon {...props} icon="pencil" color={PRIMARY_COLOR} />
                  </TouchableOpacity>
                )}
              />
              <List.Item
                title="Adresse email"
                description={shop.email ? shop.email : "Aucune adresse email"}
                left={(props) => (
                  <List.Icon {...props} icon="mail" color={PRIMARY_COLOR} />
                )}
                right={(props) => (
                  <TouchableOpacity onPress={() => alert("edit")}>
                    <List.Icon {...props} icon="pencil" color={PRIMARY_COLOR} />
                  </TouchableOpacity>
                )}
              />
            </List.Section>
            <List.Section>
              <List.Subheader>Adresses</List.Subheader>
              {shop.addresses.length > 0 ? (
                shop.addresses.map((address, key) => (
                  <List.Item
                    numberOfLines={4}
                    key={key}
                    title="Adresse"
                    description={`${address.number} ${address.street} ${address.postalCode}, ${address.city} `}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="map-marker"
                        color={PRIMARY_COLOR}
                      />
                    )}
                    right={(props) => (
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => {
                          setAddressBody({...address})
                          setEditMode(true)
                          scrollViewRef.current.scrollToEnd({ animated: true })
                        } }>
                          <List.Icon
                            {...props}
                            icon="pencil"
                            color={PRIMARY_COLOR}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showDialog()}>
                          <List.Icon
                            {...props}
                            icon="close"
                            color={PRIMARY_COLOR}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                ))
              ) : (
                <Text style={styles.noAddresses}>Aucune adresse</Text>
              )}
              {addMode || editMode && (
                <View style={styles.formInput}>
                  {errAddr &&
                    errAddr.map(
                      (err) =>
                        err.field == "number" && (
                          <Text style={styles.err}>{err.message}</Text>
                        )
                    )}
                  <TextInput
                    keyboardType="number-pad"
                    theme={theme}
                    selectionColor={PRIMARY_COLOR}
                    underlineColor={PRIMARY_COLOR}
                    style={styles.input}
                    label="Numéro de rue"
                    value={addressBody.number}
                    onChangeText={(text) =>
                      setAddressBody({ ...addressBody, number: text })
                    }
                  />
                  {errAddr &&
                    errAddr.map(
                      (err) =>
                        err.field == "street" && (
                          <Text style={styles.err}>{err.message}</Text>
                        )
                    )}
                  <TextInput
                    theme={theme}
                    selectionColor={PRIMARY_COLOR}
                    underlineColor={PRIMARY_COLOR}
                    style={styles.input}
                    label="Rue"
                    value={addressBody.street}
                    onChangeText={(text) =>
                      setAddressBody({ ...addressBody, street: text })
                    }
                  />
                  {errAddr &&
                    errAddr.map(
                      (err) =>
                        err.field == "city" && (
                          <Text style={styles.err}>{err.message}</Text>
                        )
                    )}
                  <TextInput
                    theme={theme}
                    selectionColor={PRIMARY_COLOR}
                    underlineColor={PRIMARY_COLOR}
                    style={styles.input}
                    label="Ville"
                    value={addressBody.city}
                    onChangeText={(text) =>
                      setAddressBody({ ...addressBody, city: text })
                    }
                  />
                  {errAddr &&
                    errAddr.map(
                      (err) =>
                        err.field == "postalcode" && (
                          <Text style={styles.err}>{err.message}</Text>
                        )
                    )}
                  <TextInput
                    keyboardType="number-pad"
                    theme={theme}
                    selectionColor={PRIMARY_COLOR}
                    underlineColor={PRIMARY_COLOR}
                    style={styles.input}
                    label="Code postal"
                    value={addressBody.postalCode}
                    onChangeText={(text) =>
                      setAddressBody({ ...addressBody, postalCode: text })
                    }
                  />
                  <View style={styles.submitContent}>
                    <TouchableOpacity
                      style={styles.submitBtn}
                      onPress={() => !loadingAddr && addMode ? handleAddAddress() : editMode && handleEditAddress()}
                    >
                      {loadingAddr ? (
                        <ActivityIndicator
                          size="small"
                          animating
                          color="#FFFFFF"
                        />
                      ) : (
                        <Icon name="check" color="#FFFFFF" size={24} />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.submitBtn}
                      onPress={() => addMode ? setAddMode(false): editMode && setEditMode(false)}
                    >
                      <Icon name="close" color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {!addMode && (
                <TouchableOpacity
                  style={styles.newAddressBtn}
                  onPress={() => setAddMode(true)}
                >
                  <Text style={styles.newAddressBtnText}>
                    Ajouter une adresse
                  </Text>
                </TouchableOpacity>
              )}
            </List.Section>
          </View>
        </ScrollView>
      )}
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alèrte</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  shopMainContent: {
    marginVertical: 15,
  },
  shopImg: {
    resizeMode: "contain",
    width: 150,
    height: 150,
  },
  imgContent: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 150,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  shopName: {
    marginTop: 15,
    fontSize: 24,
    color: "#7c7c7c",
    textAlign: "center",
  },
  noAddresses: {
    textAlign: "center",
    color: "#727272",
  },
  newAddressBtn: {
    margin: 30,
    backgroundColor: PRIMARY_COLOR,
    padding: 16,
  },
  newAddressBtnText: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  formInput: {
    width: "100%",
    padding: 30,
    justifyContent: "center",
  },
  input: {
    marginBottom: 5,
  },
  submitBtn: {
    backgroundColor: PRIMARY_COLOR,
    padding: 8,
    marginRight: 5,
  },
  submitContent: {
    flex: 1,
    flexDirection: "row",
  },
  err: {
    color: INFO_COLOR,
  },
});

export default ShowSingleShop;
