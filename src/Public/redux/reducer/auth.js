const initialState = {
  data: [],
  isLoading: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'LOGIN_REQUEST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      };
    case 'LOGIN_REQUEST_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export { auth };
