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

const actionRegisterRequest = payload => {
  const body = qs.stringify(payload);
  return {
    type: 'REGISTER_REQUEST',
    payload: axios.post(`${API_HOST}/auth/register`, body).then(({ data }) => {
      return data.data;
    })
  };
};

const actionGetVerificationCodeRequest = payload => {
  const body = qs.stringify(payload);
  return {
    type: 'GET_VERIFICATION_CODE_REQUEST',
    payload: axios
      .post(`${API_HOST}/auth/forgot_password_email`, body)
      .then(({ data }) => {
        return data.data;
      })
  };
};

const actionResetPasswordRequest = payload => {
  const body = qs.stringify(payload);
  return {
    type: 'RESET_PASSWORD_REQUEST',
    payload: axios
      .post(`${API_HOST}/auth/forgotPassword`, body)
      .then(({ data }) => {
        return data.data;
      })
  };
};

const actionLogoutRequest = () => {
  return {
    type: 'LOGOUT_REQUEST'
  };
};

export {
  actionLoginRequest,
  actionRegisterRequest,
  actionGetVerificationCodeRequest,
  actionResetPasswordRequest,
  actionLogoutRequest
};
