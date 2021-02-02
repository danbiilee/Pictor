import { takeEvery } from 'redux-saga/effects';
import {
  getPicturesSaga,
  addPictureSaga,
  deletePictureSaga,
} from './pictures.saga';

const GET_PICTURES = 'GET_PICTURES';
const GET_PICTURES_SUCCESS = 'GET_PICTURES_SUCCESS';

const ADD_PICTURE = 'ADD_PICTURE';
const ADD_PICTURE_SUCCESS = 'ADD_PICTURE_SUCCESS';

const DELETE_PICTURE = 'DELETE_PICTURE';
const DELETE_PICTURE_SUCCESS = 'DELETE_PICTURE_SUCCESS';

const ADD_SELECTED_PICTURES = 'ADD_SELECTED_PICTURES';
const DELETE_SELECTED_PICTURES = 'DELETE_SELECTED_PICTURES';
const CLEAR_SELECTED_PICTURES = 'CLEAR_SELECTED_PICTURES';

const CHANGE_DRWAN_PICTURE = 'CHANGE_DRWAN_PICTURE';
const CHANGE_CANVAS_MODE = 'CHANGE_CANVAS_MODE';
const CHANGE_PROPERTIES = 'CHANGE_PROPERTIES';

export const getPictures = () => ({ type: GET_PICTURES });

export const addPicture = payload => ({ type: ADD_PICTURE, payload });
export const deletePicture = payload => ({ type: DELETE_PICTURE, payload });

export const addSelectedPictures = payload => ({
  type: ADD_SELECTED_PICTURES,
  payload,
});
export const deleteSelectedPictures = payload => ({
  type: DELETE_SELECTED_PICTURES,
  payload,
});
export const clearSelectedPictures = () => ({
  type: CLEAR_SELECTED_PICTURES,
});

export const changeDrawnPicture = payload => ({
  type: CHANGE_DRWAN_PICTURE,
  payload,
});
export const changeCanvasMode = payload => ({
  type: CHANGE_CANVAS_MODE,
  payload,
});
export const changeProperties = payload => ({
  type: CHANGE_PROPERTIES,
  payload,
});

export function* pictureSaga() {
  yield takeEvery(GET_PICTURES, getPicturesSaga);
  yield takeEvery(ADD_PICTURE, addPictureSaga);
  yield takeEvery(DELETE_PICTURE, deletePictureSaga);
}

export const initialData = {
  properties: {
    color: '#ffffff',
    canvasWidth: 0,
    canvasHeight: 0,
    imgWidth: 0,
    imgHeight: 0,
    gap: 50,
    type: 'vanilla',
  },
};

const initialState = {
  pictures: [],
  selectedPictures: [], // 삭제
  drawnPicture: null,
  canvasMode: null,
  properties: initialData.properties,
};

export default function pictures(state = initialState, action) {
  //console.log('reducer', action.type);
  switch (action.type) {
    case GET_PICTURES_SUCCESS:
    case DELETE_PICTURE_SUCCESS:
      return {
        ...state,
        pictures: action.payload,
      };
    case ADD_PICTURE_SUCCESS:
      return {
        ...state,
        pictures: state.pictures.concat(action.payload),
      };
    case ADD_SELECTED_PICTURES:
      return {
        ...state,
        selectedPictures: state.selectedPictures.concat(action.payload),
      };
    case DELETE_SELECTED_PICTURES:
      return {
        ...state,
        selectedPictures: state.selectedPictures.filter(
          item => item !== action.payload,
        ),
      };
    case CLEAR_SELECTED_PICTURES:
      return {
        ...state,
        selectedPictures: [],
      };
    case CHANGE_DRWAN_PICTURE:
      return {
        ...state,
        drawnPicture: action.payload,
      };
    case CHANGE_CANVAS_MODE:
      return {
        ...state,
        canvasMode: action.payload,
      };
    case CHANGE_PROPERTIES:
      return {
        ...state,
        properties: action.payload,
      };
    default:
      return state;
  }
}
