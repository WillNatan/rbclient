import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { LOGIN_URL } from "../config";
import { INFO_COLOR, PRIMARY_COLOR } from "../constants/cssConstants";
import { authenticate } from "../services/AuthService";

const LoginScreen = ({ navigation }) => {
  const [errMessage, setErrMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleToken = async () => {
    if(await AsyncStorage.getItem('token') !== null){
      return navigation.replace('DrawerStack')
    }
  }



  const handleLogin = async () => {
    setLoading(true)
    setErrMessage();
    await authenticate(credentials)
      .then( async (response) => {
        setLoading(false)
        await AsyncStorage.setItem('token', JSON.stringify(response.data.token))
        navigation.replace('DrawerStack')
      } )
      .catch((err) => 
        {
          setLoading(false)
          setErrMessage('Vos identifiants sont incorrects')
        }
      )
      ;
  };

  useEffect(() => {
    handleToken()
  },[])
 
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/assets/background.png")}
        style={styles.backgroundImg}
      />
      <View style={styles.loginForm}>
        <Image
          source={require("../../assets/assets/logo-full.png")}
          style={styles.logoImg}
        />
        <Text style={styles.label}>Adresse email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(username) =>
            setCredentials({ ...credentials, username: username })
          }
        />
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize = 'none'
          onChangeText={(password) =>
            setCredentials({ ...credentials, password: password })
          }
        />
        {errMessage && <Text style={styles.err} >{errMessage}</Text>}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => handleLogin()}
        >
          <Text style={styles.submitBtnText}>{loading ? <ActivityIndicator color={"#FFFFFF"} size={"small"} /> : "Connexion"}</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.linksBtn}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.loginLinks}>Mot de passe oublié?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.loginLinks}>Pas encore inscrit ?</Text>
          <TouchableOpacity
            style={styles.linksBtn}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: INFO_COLOR }}> Inscription</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImg: {
    resizeMode: "contain",
    position: "absolute",
  },
  logoImg: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    width: "100%",
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  loginForm: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  label: {
    marginTop: 15,
    color: "#FFFFFF",
  },
  submitBtn: {
    height: 60,
    width: "100%",
    borderRadius: 100,
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
  },
  submitBtnText: {
    color: "#FFFFFF",
  },
  loginLinks: {
    color: "#FFFFFF",
  },
  err:{
    color: INFO_COLOR
  }
});
export default LoginScreen;
