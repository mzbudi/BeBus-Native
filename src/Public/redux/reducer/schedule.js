const initialState = {
  departureData: [],
  arrivalData: [],
  dateSearch: [],
  qty: 1,
  dataFind: {},
  searchResult: [],
  busDetail: {}
};

const schedule = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DEPARTURE':
      return {
        ...state,
        departureData: action.payload
      };
    case 'RESET_DEPARTURE':
      return {
        ...state,
        departureData: []
      };
    case 'ADD_ARRIVAL':
      return {
        ...state,
        arrivalData: action.payload
      };
    case 'RESET_ARRIVAL':
      return {
        ...state,
        arrivalData: []
      };
    case 'INCREMENT_DATA':
      return {
        ...state,
        qty: state.qty + 1
      };
    case 'DECREMENT_DATA':
      if (state.qty === 1) {
        return {
          ...state
        };
      } else {
        return {
          ...state,
          qty: state.qty - 1
        };
      }
    case 'ADD_DATE':
      return {
        ...state,
        dateSearch: action.payload
      };
    case 'FIND_BUS_PENDING':
      return {
        ...state,
        isLoading: false
      };
    case 'FIND_BUS_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'FIND_BUS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        searchResult: action.payload
      };
    case 'MINMAX_DEPART_PENDING':
      return {
        ...state,
        isLoading: false
      };
    case 'MINMAX_DEPART_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'MINMAX_DEPART_FULFILLED':
      return {
        ...state,
        isLoading: false,
        searchResult: action.payload
      };
    case 'GET_BUS_DETAIL_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_BUS_DETAIL_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_BUS_DETAIL_FULFILLED':
      return {
        ...state,
        busDetail: action.payload,
        isLoading: false
      };
    case 'RESET_SCHEDULE':
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export { schedule };
