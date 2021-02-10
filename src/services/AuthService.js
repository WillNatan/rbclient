import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_URL, REGISTER_URL, RESET_URL } from "../config";

function authenticate (credentials) {
    return axios.post(LOGIN_URL, credentials);
}

function register (body) {
    return axios.post(REGISTER_URL, body);
}

function reset (email) {
    return axios.post(RESET_URL, email);
}


async function logoutApp() {
    if(await AsyncStorage.removeItem('token') != null){
        await AsyncStorage.removeItem('token')
    }
}

function decodeToken(token) {
    return jwtDecode(token)
}

export {
    authenticate,
    logoutApp,
    register,
    reset,
    decodeToken
}