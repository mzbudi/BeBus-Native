import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Schedule extends Component {
  render() {
    return (
      <View>
        <Text>Schedule</Text>
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
)(Schedule);
