import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class ChangePassword extends Component {
  render() {
    return (
      <View>
        <Text>ChangePassword</Text>
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
)(ChangePassword);
