import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { register } from "../services/AuthService";

const RegisterScreen = ({ navigation }) => {
  const [errMessage, setErrMessage] = useState();
  const [passwordCheck, setPasswordCheck] = useState({
    firstPassword :"",
    secondPassword :""
  })
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleRegister = async () => {
    setErrMessage();
    setLoading(true);
    if(passwordCheck.firstPassword != passwordCheck.secondPassword){
      setErrMessage([
        {
          field: "password",
          message:"Les mots de passe ne correspondent pas !"
        }
      ])
      setLoading(false);
      return ;
    }
    setBody({
      ...body,
      password: passwordCheck.firstPassword
    })
    await register(body)
      .then((response) => {
        navigation.navigate('Login')
        setLoading(false);
      })
      .catch((e) => {
        setErrMessage(e.response.data);
        setLoading(false);
      });
  };
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
        {errMessage &&
          errMessage.map(
            (err, key) =>
              err.field == "email" && (
                <Text key={key} style={styles.err}>
                  {err.message}
                </Text>
              )
          )}
        <Text style={styles.label}>Adresse email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => setBody({ ...body, email: email })}
        />
        {errMessage &&
          errMessage.map(
            (err, key) =>
              err.field == "password" && (
                <Text key={key} style={styles.err}>
                  {err.message}
                </Text>
              )
          )}
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => setPasswordCheck({ ...passwordCheck, firstPassword: password })}
        />
        <Text style={styles.label}>Retaper le mot de passe</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => setPasswordCheck({ ...passwordCheck, secondPassword: password })}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, margin: 2, alignItems: "center" }}>
            {errMessage &&
              errMessage.map(
                (err, key) =>
                  err.field == "firstName" && (
                    <Text key={key} style={styles.err}>
                      {err.message}
                    </Text>
                  )
              )}
            <Text style={styles.label}>Nom</Text>
            <TextInput style={styles.input} 
              onChangeText={(firstName) => setBody({ ...body, firstName: firstName })}
            />
          </View>
          <View style={{ flex: 1, margin: 2, alignItems: "center" }}>
            {errMessage &&
              errMessage.map(
                (err, key) =>
                  err.field == "lastName" && (
                    <Text key={key} style={styles.err}>
                      {err.message}
                    </Text>
                  )
              )}
            <Text style={styles.label}>Prénom</Text>
            <TextInput style={styles.input}
              onChangeText={(lastName) => setBody({ ...body, lastName: lastName })}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => handleRegister()}
        >
          <Text style={styles.submitBtnText}>
            {loading ? (
              <ActivityIndicator color={"#FFFFFF"} size="small" />
            ) : (
              "Inscription"
            )}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.loginLinks}>Déjà un compte ?</Text>
          <TouchableOpacity
            style={styles.linksBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "#2D34FF" }}>Connexion</Text>
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
    paddingHorizontal: 20,
  },
  loginForm: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  label: {
    marginTop: 5,
    color: "#FFFFFF",
  },
  submitBtn: {
    height: 60,
    width: "100%",
    borderRadius: 100,
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#FF5E62",
    justifyContent: "center",
  },
  submitBtnText: {
    color: "#FFFFFF",
  },
  loginLinks: {
    color: "#FFFFFF",
  },
  err: {
    color: "#2D34FF",
  },
});
export default RegisterScreen;
