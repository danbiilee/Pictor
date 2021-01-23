import { call, put } from 'redux-saga/effects';
import * as api from '../indexedDB/particles';

export function* getParticlesSaga() {
  try {
    const particles = yield call(api.getParticles);
    yield put({
      type: 'GET_PARTICLES_SUCCESS',
      payload: particles,
    }); // 액션 디스패치
  } catch (e) {
    console.log('getParticlesSaga Error', e);
  }
}

export function* addParticleSaga(action) {
  try {
    // Dexie로 자동 생성되는 pk값 얻을 수 있음
    const result = yield call(api.addParticle, action.payload);
    yield put({
      type: 'ADD_PARTICLE_SUCCESS',
      payload: result,
    });
  } catch (e) {
    console.log('addParticleSaga Error', e);
  }
}

export function* deleteParticleSaga(action) {
  try {
    const result = yield call(api.deleteParticle, action.payload);
    yield put({
      type: 'DELETE_PARTICLE_SUCCESS',
      payload: result,
    });
  } catch (e) {
    console.log('deleteParticleSaga Error', e);
  }
}
