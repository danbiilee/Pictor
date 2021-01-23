import { call, put } from 'redux-saga/effects';
import * as api from '../indexedDB/pictures';

export function* getPicturesSaga() {
  try {
    const particles = yield call(api.getPictures);
    yield put({
      type: 'GET_PARTICLES_SUCCESS',
      payload: particles,
    }); // 액션 디스패치
  } catch (e) {
    console.log('getPicturesSaga Error', e);
  }
}

export function* addPictureSaga(action) {
  try {
    // Dexie로 자동 생성되는 pk값 얻을 수 있음
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
