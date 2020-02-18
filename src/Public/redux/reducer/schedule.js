const initialState = {
  departureData: [],
  arrivalData: [],
  dateSearch: [],
  qty: 1,
  dataFind: {},
  searchResult: [],
};

const schedule = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DEPARTURE':
      return {
        ...state,
        departureData: action.payload
      };
    case 'ADD_ARRIVAL':
      return {
        ...state,
        arrivalData: action.payload
      };
    case 'INCREMENT_DATA':
      return {
        ...state,
        qty: state.qty + 1
      };
    case 'DECREMENT_DATA':
      return {
        ...state,
        qty: state.qty - 1
      };
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
    default:
      return state;
  }
};

export { schedule };