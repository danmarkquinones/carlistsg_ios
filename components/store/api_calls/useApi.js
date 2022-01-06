import axios from 'axios';
import {Platform} from 'react-native';
import {API_BASE_URL} from '@env';
import Kjur from '../helpers/jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Strict-Transport-Security': 'max-age=90',
  },
};

const POST = async (params, route) => {
  const token = Kjur.encode(params);

  const bearerToken = await AsyncStorage.getItem('bearerToken');
  axiosConfig.headers['Content-Type'] = 'application/json;charset=UTF-8';
  axiosConfig.headers['Authorization'] = `Bearer ${bearerToken}`;

  return axios
    .post(`${API_BASE_URL}${route}`, {token: token}, axiosConfig)
    .then(res => {
      return res;
    })
    .catch(error => {
      return {error: error.message, status: 500};
    });
};

const POST_IMAGE = async (payload, route) => {
  const bearerToken = await AsyncStorage.getItem('bearerToken');
  axiosConfig.headers['Authorization'] = `Bearer ${bearerToken}`;
  axiosConfig.headers['Content-Type'] = 'multipart/form-data';

  const form = new FormData();

  form.append('image', {
    name: payload.filename,
    type: 'image/*',
    uri:
      Platform.OS === 'android'
        ? payload.file
        : payload.file.replace('file://', ''),
  });

  form.append('type', 'image');

  return axios
    .post(`${API_BASE_URL}${route}`, form, axiosConfig)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

const GET = (route, params) => {
  const token = Kjur.encode(params ? params : {});

  return axios
    .get(`${API_BASE_URL}${route}?token=${token}`)
    .then(res => {
      return res;
    })
    .catch(error => {
      return {error: error.message, status: 500};
    });
};

const UPDATE = async (route, params) => {
  const token = Kjur.encode(params);

  const bearerToken = await AsyncStorage.getItem('bearerToken');

  axiosConfig.headers['Authorization'] = `Bearer ${bearerToken}`;

  return axios
    .put(`${API_BASE_URL}${route}`, {token: token}, axiosConfig)
    .then(res => {
      console.log('DELET', res);
      return res;
    })
    .catch(error => {
      return {error: error.message, status: 500};
    });
};

const DELETE = async (route, params) => {
  const token = Kjur.encode(params);

  const bearerToken = await AsyncStorage.getItem('bearerToken');

  axiosConfig.headers['Authorization'] = `Bearer ${bearerToken}`;

  // return axios
  //   .delete(`${API_BASE_URL}${route}`, {token: token}, axiosConfig)
  //   .then(res => {
  //     console.log('DELET', res);
  //     return res;
  //   })
  //   .catch(error => {
  //     return {error: error.message, status: 500};
  //   });

  return axios.delete(`${API_BASE_URL}${route}`, {
    headers: axiosConfig.headers,
    data: {
      token: token,
    },
  });
};

export const api = {POST, GET, UPDATE, DELETE, POST_IMAGE};

export const logout = () => {
  AsyncStorage.setItem('isLoggedIn', '0');
  AsyncStorage.setItem('userDetails', '{}');
  AsyncStorage.setItem('bearerToken', '{}');
};
