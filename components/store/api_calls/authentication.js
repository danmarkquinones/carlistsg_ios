import axios from "axios";
import {API_BASE_URL} from '@env';
import Kjur from '../helpers/jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const post = (params, route) => {
  const token = Kjur.encode(params);
  return axios
    .post(
      `${API_BASE_URL}${route}`,
      {token: token},
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json;charset=UTF-8',
          'Strict-Transport-Security': 'max-age=90',
        },
      },
    )
    .then(res => {
      console.log('RES', res);
      return res;
    })
    .catch(error => {
      console.log(error);
      return {error: error.message, status: 500};
    });
};

export const get = (route, params) => {
  const token = Kjur.encode(params ? params : null);
  return axios
    .get(`${API_BASE_URL}${route}`, token ? {token: token} : {})
    .then(res => {
      return res;
    })
    .catch(error => {
      return {error: error.message, status: 500};
    });
};

export const getAdvert = (route, params) => {
  const token = Kjur.encode({
    _id: '61ab43ee561db2167e58ccd2',
    page: 1,
    limit: 10,
  });

  return axios
    .get(`${API_BASE_URL}${route}?token=${token}`)
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(error);
      return {error: error.message, status: 500};
    });
};

export const deleteProduct = (route, params) => {
  const token = Kjur.encode(params);

  console.log(token);

  return axios
    .delete(`${API_BASE_URL}${route}?token=${token}`)
    .then(res => {
      console.log('DELETED', res);
      return res;
    })
    .catch(error => {
      console.log('DELETE ERROR', error);
      return {error: error.message, status: 500};
    });
};



export const logout = () => {
  AsyncStorage.setItem('isLoggedIn' , '0')
  AsyncStorage.setItem('userDetails' , '{}')
  AsyncStorage.setItem('bearerToken' , '{}')
}
