import axios from "axios";
import { ADDRESS_URL, MY_SHOPS_URL, SHOP_URL } from "../config";

function fetchMyShops(id) {
    return axios.get(MY_SHOPS_URL+"/"+id)
}

function addShop(body){
    return axios.post(SHOP_URL, body)
}

function findOneShop(shopid){
    return axios.get(SHOP_URL+"/"+shopid)
}

function addAddress(addressBody){
    return axios.post(ADDRESS_URL, addressBody)
}

function editAddress(addressBody){
    return axios.put(ADDRESS_URL, addressBody)
}

export {
    fetchMyShops,
    addShop,
    findOneShop,
    addAddress,
    editAddress
}