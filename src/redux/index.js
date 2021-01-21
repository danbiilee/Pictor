import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import particles, { particleSaga } from './particles';

const rootReducer = combineReducers({ particles });

export function* rootSaga() {
  yield all([particleSaga()]);
}

export default rootReducer;
