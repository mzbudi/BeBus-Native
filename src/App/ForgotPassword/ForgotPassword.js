import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class ForgotPassword extends Component {
  render() {
    return (
      <View>
        <Text>ForgotPassword</Text>
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
)(ForgotPassword);
