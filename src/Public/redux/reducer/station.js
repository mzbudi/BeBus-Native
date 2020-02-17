const initialState = {
  data: [],
  isLoading: false
};

const station = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STATION_PENDING':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_STATION_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_STATION_FULFILLED':
      return {
        isLoading: false,
        data: action.payload
      };
    default:
      return state;
  }
};

export { station };
