// import axios from 'axios';
// import qs from 'qs';

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
  return {
    type: 'FIND_BUS',
    payload: payload
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
