const DOMAIN = "https://runboutikapi.herokuapp.com";
// const DOMAIN = "http://192.168.1.5:8000";

const API_URL = DOMAIN+"/api";

const LOGIN_URL = API_URL+"/login_check";
const REGISTER_URL = DOMAIN+"/register";
const RESET_URL = DOMAIN+"/reset-password-email";
const MY_SHOPS_URL = API_URL+"/my-shops";
const SHOP_URL = API_URL+"/shop";
const ADDRESS_URL = API_URL+"/address";

export {
    LOGIN_URL,
    API_URL,
    REGISTER_URL,
    RESET_URL,
    MY_SHOPS_URL,
    SHOP_URL,
    ADDRESS_URL
}