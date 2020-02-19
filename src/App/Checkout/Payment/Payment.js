import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const Payment = props => {
  const { navigation } = props;
  return <WebView source={{ uri: navigation.state.params.paymentUrl }} />;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
