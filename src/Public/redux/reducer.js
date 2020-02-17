import { combineReducers } from 'redux';
import { auth } from './reducer/auth';
import { station } from './reducer/station';
import { schedule } from './reducer/schedule';

export default combineReducers({
  auth,
  station,
  schedule
});
