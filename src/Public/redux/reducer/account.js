const initialState = {
  isLoading: false
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case 'PUT_CHANGE_PASSWORD_PENDING':
      return {
        isLoading: true
      };
    case 'PUT_CHANGE_PASSWORD_FULFILLED':
      return {
        isLoading: false
      };
    case 'PUT_CHANGE_PASSWORD_REJECTED':
      return {
        isLoading: false
      };
    default:
      return state;
  }
};

export { account };
