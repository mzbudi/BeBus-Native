import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';
import ForgotPassword from '../../Auth/ForgotPassword';

import { color } from '../components/Layout';

const navigationOptions = title => {
  return {
    navigationOptions: {
      title: title,
      headerStyle: {
        height: 50,
        backgroundColor: color.Primary
      },
      headerTintColor: color.TextSecondary
    }
  };
};

export default createStackNavigator(
  {
    AuthLogin: {
      screen: Login,
      ...navigationOptions('Login')
    },
    AuthRegister: {
      screen: Register,
      ...navigationOptions('Register')
    },
    ForgotPassword: {
      screen: ForgotPassword,
      ...navigationOptions('Forget Password')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);
