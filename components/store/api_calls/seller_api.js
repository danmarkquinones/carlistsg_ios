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

export const getAdvertiserReviews = async (id , page) => {

    const obj = {
        advertiser_id: id,
        page: page
    }

    const encodedData = Kjur.encode(obj)
    const bearerToken = await AsyncStorage.getItem('bearerToken')

    axiosConfig.headers["Authorization"] = `Bearer ${bearerToken}`
    console.log('config' , encodedData)

    return await axios.get(`${API_BASE_URL}/advertiser/reviews?token=${encodedData}` , 
        {
            token:encodedData
        },
        axiosConfig
    )
}

export const addAdvertiserReview = async (data , rating) => {
    const obj = {
        advertiser_id: data.itemId,
        user_id:data.userId,
        review_score: rating,
        is_anonymous: data.anonymous,
        first_name: data.fname,
        last_name: data.lname,
        comment: {
            review_text: data.comment,
            show: true
        }
    }

    const encodedData = Kjur.encode(obj)

    console.log(encodedData)

    return await axios.post(`${API_BASE_URL}/advertiser/reviews/add`,
        {token:encodedData},
        axiosConfig
    )
}