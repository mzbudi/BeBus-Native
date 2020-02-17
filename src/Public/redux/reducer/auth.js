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
    case 'POST_REGISTER_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'POST_REGISTER_FULFILLED':
      return {
        ...state,
        isLoading: false
      };
    case 'POST_REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'PUT_CHANGE_PASSWORD_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'PUT_CHANGE_PASSWORD_FULFILLED':
      return {
        ...initialState
      };
    case 'PUT_CHANGE_PASSWORD_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'PUT_CHANGE_CONTACTINFO_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'PUT_CHANGE_CONTACTINFO_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, ...action.payload }
      };
    case 'PUT_CHANGE_CONTACTINFO_REJECTED':
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
