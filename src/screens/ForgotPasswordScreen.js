import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { reset } from "../services/AuthService";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({
    email: "",
  });
  const [emailMessage, setEmailMessage] = useState();
  const [loading, setLoading] = useState(false);
  const handleSendReset = async () => {
    setLoading(true);
    setEmailMessage();
    await reset(email)
      .then((response) => {
        setLoading(false);
        setEmailMessage({
          status: 200,
          message: response.data.message,
        });
      })
      .catch((e) => {
        setLoading(false);
        setEmailMessage({
          status: 400,
          message: e.response.data[0].message,
        });
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
        {emailMessage && (
          <View style={styles.card}>
            <View style={styles.cardBody}>
              {emailMessage.status == 200 ? (
                <>
                  <Text style={styles.cardText}>{emailMessage.message}</Text>
                </>
              ) : emailMessage.status == 400 && (
                <>
                  <Text style={styles.cardText}>{emailMessage.message}</Text>
                </>
              )}
            </View>
          </View>
        )}
        <Text style={styles.label}>Adresse email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail({ email: text })}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => handleSendReset()}
        >
          <Text style={styles.submitBtnText}>
            {!loading ? (
              "Envoyer"
            ) : (
              <ActivityIndicator color="#FFFFFF" size="small" />
            )}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.loginLinks}>Déjà un compte ?</Text>
          <TouchableOpacity
            style={styles.linksBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "#2D34FF" }}> Connexion</Text>
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
  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 16,
    borderRadius: 16,
  },
  cardText: {
    textAlign: "center",
    color: "#454545",
  },
  cardBody: {
    alignItems: "center",
  },
});

export default ForgotPasswordScreen;
