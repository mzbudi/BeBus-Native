import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

const actionBookingRequest = ({ token, payload }) => {
  const body = qs.stringify(payload);
  return {
    type: 'BOOKING_REQUEST',
    payload: axios.post(`${API_HOST}/booking`, body).then(({ data }) => {
      return data.data;
    })
  };
};

export { actionBookingRequest };
