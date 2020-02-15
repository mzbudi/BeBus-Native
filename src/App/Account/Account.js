import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Account extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text onPress={() => navigation.navigate('Auth')}>
          Login / Register
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
