import { createStackNavigator } from 'react-navigation-stack';

import Home from '../../App/Home';
import Account from '../../App/Account';
import History from '../../App/History';
import Schedule from '../../App/Schedule';
import Recommendation from '../../App/Recommendation';

export default createStackNavigator({
  Home: {
    screen: Home
  },
  Account: {
    screen: Account
  },
  History: {
    screen: History
  },
  Schedule: {
    screen: Schedule
  },
  Recommendation: {
    screen: Recommendation
  }
});
