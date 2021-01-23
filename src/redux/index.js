import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import pictures, { pictureSaga } from './pictures';

const rootReducer = combineReducers({ pictures });

export function* rootSaga() {
  yield all([pictureSaga()]);
}

export default rootReducer;
