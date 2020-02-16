import { combineReducers } from 'redux';
import { auth } from './reducer/auth';
import { account } from './reducer/account';

export default combineReducers({
  auth,
  account
});
