import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class History extends Component {
  render() {
    return (
      <View>
        <Text>History</Text>
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
)(History);
