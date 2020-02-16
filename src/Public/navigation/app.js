import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { color } from '../components/Layout';

import Home from '../../App/Home';
import Account from '../../App/Account';
import History from '../../App/History';
import Schedule from '../../App/Schedule';
import Recommendation from '../../App/Recommendation';
import ForgotPassword from '../../App/ForgotPassword';
import SearchStation from '../../App/Home/SearchStation/';

import Login from '../../Auth/Login';
import Register from '../../Auth/Register';

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

const HomeScreen = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false
      }
    },
    Schedule: {
      screen: Schedule,
      ...navigationOptions('Schedule')
    },
    SearchStation: {
      screen: SearchStation,
      ...navigationOptions('Search Station')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

const RecommendationScreen = createStackNavigator(
  {
    Recommendation: {
      screen: Recommendation,
      ...navigationOptions('Explore')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

const HistoryScreen = createStackNavigator(
  {
    History: {
      screen: History,
      ...navigationOptions('My Trip')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

const AccountScreen = createStackNavigator(
  {
    Account: {
      screen: Account,
      ...navigationOptions('Account')
    },
    Login: {
      screen: Login,
      ...navigationOptions('Login')
    },
    ForgotPassword: {
      screen: ForgotPassword,
      ...navigationOptions('Forget Password')
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

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name="home"
            size={25}
            color={focused ? color.Primary : color.Secondary}
          />
        )
      }
    },
    Recommendation: {
      screen: RecommendationScreen,
      navigationOptions: {
        title: 'Explore',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="explore"
            size={25}
            color={focused ? color.Primary : color.Secondary}
          />
        )
      }
    },
    History: {
      screen: HistoryScreen,
      navigationOptions: {
        title: 'My Trip',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="card-travel"
            size={25}
            color={focused ? color.Primary : color.Secondary}
          />
        )
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name="person"
            size={25}
            color={focused ? color.Primary : color.Secondary}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: color.Primary,
      inactiveTintColor: color.Secondary
    }
  }
);
