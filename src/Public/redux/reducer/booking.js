const initialState = {
  dataBooking: [],
  dataBookingID: [],
  isLoading: false
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOKING_PENDING':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_BOOKING_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_BOOKING_FULFILLED':
      return {
        isLoading: false,
        dataBooking: action.payload
      };
    case 'GET_BOOKINGID_PENDING':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_BOOKINGID_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_BOOKINGID_FULFILLED':
      return {
        isLoading: false,
        dataBookingID: action.payload
      };
    case 'BOOKING_REQUEST_FULFILLED':
      return {
        ...state,
        booking: action.payload
      };
    default:
      return state;
  }
};

export { booking };