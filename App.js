import React, { Component } from 'react';
import Navigator from './src/Public/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { persistor, store } from './src/Public/redux/store';
import { Toast } from './src/Public/components/Toast';

class App extends Component {
  state = {
    appState: AppState.currentState
  };

  componentDidMount() {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast('No internet access.');
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
