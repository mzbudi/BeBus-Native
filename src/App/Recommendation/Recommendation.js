import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Recommendation extends Component {
  render() {
    return (
      <View>
        <Text>Recommendation</Text>
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
)(Recommendation);
