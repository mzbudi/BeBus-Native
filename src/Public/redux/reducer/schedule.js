const initialState = {
  departureData: [],
  arrivalData: [],
  dateSearch: [],
  qty: 1,
  dataFind: []
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
    case 'FIND_BUS':
      return {
        ...state,
        isLoading: false,
        dataFind: { ...state }
      };
    case 'FIND_BUS_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'FIND_BUS_FULFILLED':
      return {
        isLoading: false,
        data: action.payload
      };
    default:
      return state;
  }
};

export { schedule };
