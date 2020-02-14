import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import BottomNavbar from '../../Public/components/BottomNavbar';

class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home</Text>
        <BottomNavbar {...this.props} />
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
)(Home);
