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
        data: action.payload
      };
    case 'LOGIN_REQUEST_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'REGISTER_REQUEST_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'REGISTER_REQUEST_FULFILLED':
      return {
        ...state,
        isLoading: false
      };
    case 'REGISTER_REQUEST_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'CHANGE_PASSWORD_REQUEST_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'CHANGE_PASSWORD_REQUEST_FULFILLED':
      return {
        ...initialState
      };
    case 'CHANGE_PASSWORD_REQUEST_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'CHANGE_CONTACTINFO_REQUEST_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'CHANGE_CONTACTINFO_REQUEST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, ...action.payload }
      };
    case 'CHANGE_CONTACTINFO_REQUEST_REJECTED':
      return {
        ...state,
        isLoading: false
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
