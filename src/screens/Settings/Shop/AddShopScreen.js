import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { INFO_COLOR, PRIMARY_COLOR } from "../../../constants/cssConstants";
import { decodeToken } from "../../../services/AuthService";
import { addShop } from "../../../services/ShopService";

const AddShopScreen = ({navigation}) => {
    const [body, setBody] = useState({
        userid:'',
        name:''
    })
    const [errMessage, setErrMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleAddShop = async () =>{
        try{
            setErrMessage()
            setLoading(true)
        await addShop(body).then((response) => response.data)
        setLoading(false)
        navigation.goBack()
        }
        catch(e) {
            setErrMessage(e.response.data)
            setLoading(false)
            // console.log(e.response.data)
        }
    }

    const getToken = async() => {
        const decodedToken = decodeToken(await AsyncStorage.getItem('token'))
        setBody({...body, userid:decodedToken.userid})
    }

    useEffect(() =>{
        getToken()
    },[])

  return (
    <View style={styles.container}>
      {errMessage && errMessage.status === 400 ?
        (<Text style={styles.err} >{errMessage.message}</Text>)
        :
        errMessage && errMessage.map((message) => (
          <Text style={styles.err} >{message.message}</Text>
        ))
      }
      <TextInput
        label="Nom de la boutique"
        value={""}
        mode="flat"
        selectionColor={PRIMARY_COLOR}
        underlineColor={PRIMARY_COLOR}
        onChangeText={(text) => setBody({...body, name:text}) }
        style={{width:"100%"}}
        value={body.name}
        theme={{
            colors:{
                primary:PRIMARY_COLOR,
                background:"#FFFFFF"
            }
        }}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={() => handleAddShop()} >
          <Text style={styles.submitTextBtn} >{loading ? <ActivityIndicator size="large" color="#FFFFFF" /> : "Créer la boutique"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    padding:30
  },
  submitBtn:{
      backgroundColor:PRIMARY_COLOR,
      width:"100%",
      alignItems:'center',
      padding:15,
      marginTop:30
  },
  submitTextBtn:{
      color:'#FFFFFF',
      fontSize:16
  },
  err:{
    color: INFO_COLOR
  }
});

export default AddShopScreen;
