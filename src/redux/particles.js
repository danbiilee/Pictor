import { takeEvery } from 'redux-saga/effects';
import {
  getParticlesSaga,
  addParticleSaga,
  deleteParticleSaga,
} from './particles.saga';

const GET_PARTICLES = 'GET_PARTICLES';
const GET_PARTICLES_SUCCESS = 'GET_PARTICLES_SUCCESS';

const ADD_PARTICLE = 'ADD_PARTICLE';
const ADD_PARTICLE_SUCCESS = 'ADD_PARTICLE_SUCCESS';

const DELETE_PARTICLE = 'DELETE_PARTICLE';
const DELETE_PARTICLE_SUCCESS = 'DELETE_PARTICLE_SUCCESS';

const ADD_SELECTED_PARTICLE = 'ADD_SELECTED_PARTICLE';
const DELETE_SELECTED_PARTICLE = 'DELETE_SELECTED_PARTICLE';
const CLEAR_SELECTED_PARTICLE = 'CLEAR_SELECTED_PARTICLE';

const ADD_SELECTED_CROP = 'ADD_SELECTED_CROP';
const DELETE_SELECTED_CROP = 'DELETE_SELECTED_CROP';

export const getParticles = () => ({ type: GET_PARTICLES });

export const addParticle = payload => ({ type: ADD_PARTICLE, payload });
export const deleteParticle = payload => ({ type: DELETE_PARTICLE, payload });

export const addSelectedParticle = payload => ({
  type: ADD_SELECTED_PARTICLE,
  payload,
});
export const deleteSelectedParticle = payload => ({
  type: DELETE_SELECTED_PARTICLE,
  payload,
});
export const clearSelectedParticle = () => ({
  type: CLEAR_SELECTED_PARTICLE,
});

export const addSelectedCrop = payload => ({
  type: ADD_SELECTED_CROP,
  payload,
});
export const deleteSelectedCrop = () => ({ type: DELETE_SELECTED_CROP });

export function* particleSaga() {
  yield takeEvery(GET_PARTICLES, getParticlesSaga);
  yield takeEvery(ADD_PARTICLE, addParticleSaga);
  yield takeEvery(DELETE_PARTICLE, deleteParticleSaga);
}

const initialState = {
  particles: [],
  selectedParticles: [],
  selectedCrop: null,
};

export default function particles(state = initialState, action) {
  //console.log('reducer', action.type);
  switch (action.type) {
    case GET_PARTICLES_SUCCESS:
    case DELETE_PARTICLE_SUCCESS:
      return {
        ...state,
        particles: action.payload,
      };
    case ADD_PARTICLE_SUCCESS:
      return {
        ...state,
        particles: state.particles.concat(action.payload),
      };
    case ADD_SELECTED_PARTICLE:
      return {
        ...state,
        selectedParticles: state.selectedParticles.concat(action.payload),
      };
    case DELETE_SELECTED_PARTICLE:
      return {
        ...state,
        selectedParticles: state.selectedParticles.filter(
          item => item !== action.payload,
        ),
      };
    case CLEAR_SELECTED_PARTICLE:
      return {
        ...state,
        selectedParticles: [],
      };
    case ADD_SELECTED_CROP:
      return {
        ...state,
        selectedCrop: action.payload,
      };
    case DELETE_SELECTED_CROP:
      return {
        ...state,
        selectedCrop: null,
      };
    default:
      return state;
  }
}
