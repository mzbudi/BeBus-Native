import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

const actionLoginRequest = payload => {
  const body = qs.stringify(payload);
  return {
    type: 'LOGIN_REQUEST',
    payload: axios.post(`${API_HOST}/auth/login`, body).then(({ data }) => {
      return data.data;
    })
  };
};

const actionPostRegister = payload => {
  const body = qs.stringify(payload);
  return {
    type: 'POST_REGISTER',
    payload: axios.post(`${API_HOST}/auth/register`, body).then(({ data }) => {
      return data.data;
    })
  };
};

const actionLogoutRequest = () => {
  return {
    type: 'LOGOUT_REQUEST'
  };
};

export { actionLoginRequest, actionPostRegister, actionLogoutRequest };
