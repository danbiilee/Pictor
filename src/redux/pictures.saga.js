import { call, put } from 'redux-saga/effects';
import * as api from '../indexedDB/pictures';

export function* getPicturesSaga() {
  try {
    const pictures = yield call(api.initIdb);
    yield put({
      type: 'GET_PICTURES_SUCCESS',
      payload: pictures,
    }); // 액션 디스패치
  } catch (e) {
    console.log('getPicturesSaga Error', e);
  }
}

export function* addPictureSaga(action) {
  try {
    // 자동 생성되는 pk값 얻을 수 있음
    const result = yield call(api.addPicture, action.payload);
    yield put({
      type: 'ADD_PICTURE_SUCCESS',
      payload: result,
    });
  } catch (e) {
    console.log('addPictureSaga Error', e);
  }
}

export function* deletePictureSaga(action) {
  try {
    const result = yield call(api.deletePicture, action.payload);
    yield put({
      type: 'DELETE_PICTURE_SUCCESS',
      payload: result,
    });
  } catch (e) {
    console.log('deletePictureSaga Error', e);
  }
}
