const initialState = {
  data: [],
  isLoading: false,
  error: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_PENDING':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'LOGIN_REQUEST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null
      };
    case 'LOGIN_REQUEST_REJECTED':
      return {
        ...state,
        isLoading: false,
        error: action.payload.response
      };
    case 'POST_REGISTER_PENDING':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'POST_REGISTER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case 'POST_REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        error: action.payload.response
      };
    case 'LOGOUT_REQUEST':
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export { auth };
