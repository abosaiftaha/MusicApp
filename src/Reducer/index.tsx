import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import {ActionTypes} from '../Action/types';
import Configs from './Configs';

const rootReducer = combineReducers({
  Configs,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState, ActionTypes>(
  {
    key: 'music-app',
    storage: AsyncStorage,
  },
  rootReducer,
);

export default persistedReducer;
