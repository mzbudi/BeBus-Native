import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

const addDeparture = payload => {
  return {
    type: 'ADD_DEPARTURE',
    payload: payload
  };
};

const addArrival = payload => {
  return {
    type: 'ADD_ARRIVAL',
    payload: payload
  };
};

const addDate = payload => {
  return {
    type: 'ADD_DATE',
    payload: payload
  };
};

const incrementData = () => {
  return {
    type: 'INCREMENT_DATA'
  };
};

const decrementData = () => {
  return {
    type: 'DECREMENT_DATA'
  };
};

const findBusTicket = payload => {
  console.log(payload);
  const config = {
    // headers: payload.headers,
    params: {
      date: payload.date,
      departureCity: payload.departureCity,
      arrivalCity: payload.arrivalCity,
      minAvailableSeats: payload.minAvailableSeats
    }
  };
  return {
    type: 'FIND_BUS',
    payload: axios.get(`${API_HOST}/schedule/`, config).then(({ data }) => {
      return data.data;
    })
  };
};

export {
  addDeparture,
  addArrival,
  addDate,
  incrementData,
  decrementData,
  findBusTicket
};
