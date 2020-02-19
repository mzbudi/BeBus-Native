import NetInfo from '@react-native-community/netinfo';
import { Toast } from '../components/Toast';

const networkcheck = () => {
  return NetInfo.fetch().then(state => {
    if (!state.isConnected) {
      Toast('No internet access.');
    }
  });
};

export { networkcheck };
