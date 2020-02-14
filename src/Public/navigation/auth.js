import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';

export default createStackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
});
