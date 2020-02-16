import axios from 'axios';

import { API_HOST } from 'react-native-dotenv';

const actionChangePassword = ({ token, payload, id }) => {
  const body = new FormData();
  body.append('old_password', payload.old_password);
  body.append('new_password', payload.new_password);
  return {
    type: 'PUT_CHANGE_PASSWORD',
    payload: axios.put(`${API_HOST}/user/${id}`, body).then(({ data }) => {
      return data.data;
    })
  };
};

export { actionChangePassword };
