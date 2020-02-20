import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

const actionBookingRequest = ({ token, payload }) => {
  const body = qs.stringify(payload);
  return {
    type: 'BOOKING_REQUEST',
    payload: axios.post(`${API_HOST}/booking`, body, token).then(({ data }) => {
      return data.data;
    })
  };
};

const actionBookingGet = payload => {
  return {
    type: 'GET_BOOKING',
    payload: axios.get(`${API_HOST}/booking/`, payload).then(({ data }) => {
      return data.data;
    })
  };
};

const actionBookingGetID = id => {
  return {
    type: 'GET_BOOKINGID',
    payload: axios.get(`${API_HOST}/${id}`).then(({ data }) => {
      return data.data;
    })
  };
};

export { actionBookingRequest, actionBookingGet, actionBookingGetID };
