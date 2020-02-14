import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const BottomNavbar = props => {
  const { navigation } = props;
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Recommendation')}>
        <Text>Recommendation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
        <Text>Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Text>History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Text>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
        <Text>Switch To Auth</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;
