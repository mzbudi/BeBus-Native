import { combineReducers } from 'redux';
import { auth } from './reducer/auth';
import { station } from './reducer/station';
import { schedule } from './reducer/schedule';
import { booking } from './reducer/booking';

export default combineReducers({
  auth,
  station,
  schedule,
  booking
});
