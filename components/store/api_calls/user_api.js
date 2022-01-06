import axios from "axios";
import { API_BASE_URL } from '@env'
import Kjur from '../helpers/jwt'
import AsyncStorage from '@react-native-async-storage/async-storage';

let axiosConfig = {
    headers: {
        "Content-Type": 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Strict-Transport-Security": 'max-age=90',
    }
};

export const getAsyncStorageData = async (type , value) => {
    try {
      const data = await AsyncStorage.getItem(type)
      if(data === null) {
        AsyncStorage.setItem(type , value.toString()) 
      }
      return data
    } catch(e) {
      console.log(e)
    }
}

export const updateProfile = async (data) => {

    const encodedData = Kjur.encode(data)
    const bearerToken = await AsyncStorage.getItem('bearerToken')

    axiosConfig.headers["Authorization"] = `Bearer ${bearerToken}`
    // console.log('config' , axiosConfig)

    return await axios.put(`${API_BASE_URL}/profile` , 
        {
            token:encodedData
        },
        axiosConfig
    )
}

export const updateNotification = async (data) => {

    const encodedData = Kjur.encode(data)
    const bearerToken = await AsyncStorage.getItem('bearerToken')

    axiosConfig.headers["Authorization"] = `Bearer ${bearerToken}`

    console.log('notif config' , encodedData)

    return await axios.put(`${API_BASE_URL}/profile/set_notification` , 
        {
            token:encodedData
        },
        axiosConfig
    )
}