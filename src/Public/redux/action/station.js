import axios from 'axios';
// import qs from 'qs';
import { API_HOST } from 'react-native-dotenv';

const requestStation = payload => {
  const config = {
    params: {
      nameParams: payload
    }
  };
  return {
    type: 'GET_STATION',
    payload: axios.get(`${API_HOST}/station`, config).then(({ data }) => {
      return data.data;
    })
  };
};

export { requestStation };
