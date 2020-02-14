import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import asyncStorage from '@react-native-community/async-storage';

import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: asyncStorage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger)
);
const persistor = persistStore(store);

export { store, persistor };
