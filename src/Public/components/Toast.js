import { ToastAndroid } from 'react-native';

const Toast = message => {
  ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
};

export { Toast };
