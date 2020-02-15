import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';

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
    Login: {
      screen: Login,
      ...navigationOptions('Login')
    },
    Register: {
      screen: Register,
      ...navigationOptions('Register')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);
