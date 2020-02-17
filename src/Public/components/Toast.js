import { ToastAndroid } from 'react-native';

const Toast = message => {
  ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
};

export { Toast };
