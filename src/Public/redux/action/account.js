import axios from 'axios';

import { API_HOST } from 'react-native-dotenv';

const actionChangePassword = ({ token, payload, id }) => {
  const body = new FormData();
  body.append('old_password', payload.old_password);
  body.append('new_password', payload.new_password);
  return {
    type: 'CHANGE_PASSWORD_REQUEST',
    payload: axios.put(`${API_HOST}/user/${id}`, body).then(({ data }) => {
      return data.data;
    })
  };
};

const actionChangeContactInfo = ({ token, payload, id }) => {
  const body = new FormData();
  body.append('name', payload.name);
  body.append('email', payload.email);
  body.append('phone', payload.phone);
  if (payload.photo && payload.photo !== '') {
    body.append('photo', payload.photo);
  }
  return {
    type: 'CHANGE_CONTACTINFO_REQUEST',
    payload: axios.put(`${API_HOST}/user/${id}`, body).then(({ data }) => {
      return data.data;
    })
  };
};

export { actionChangePassword, actionChangeContactInfo };
