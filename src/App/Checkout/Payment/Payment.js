import React from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { Toast } from '../../../Public/components/Toast';

const Payment = props => {
  const { navigation } = props;

  const handleWebViewNavigationStateChange = newNavState => {
    const { url } = newNavState;
    if (url.includes('payment/success?status_code=200')) {
      Toast('Payment success.');
      navigation.navigate('History');
    }
  };

  return (
    <WebView
      source={{ uri: navigation.state.params.paymentUrl }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
