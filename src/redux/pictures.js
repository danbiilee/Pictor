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

const ADD_SELECTED_PICTURE = 'ADD_SELECTED_PICTURE';
const DELETE_SELECTED_PICTURE = 'DELETE_SELECTED_PICTURE';
const CLEAR_SELECTED_PICTURE = 'CLEAR_SELECTED_PICTURE';

const ADD_SELECTED_CROP = 'ADD_SELECTED_CROP';
const DELETE_SELECTED_CROP = 'DELETE_SELECTED_CROP';

export const getPictures = () => ({ type: GET_PICTURES });

export const addPicture = payload => ({ type: ADD_PICTURE, payload });
export const deletePicture = payload => ({ type: DELETE_PICTURE, payload });

export const addSelectedPicture = payload => ({
  type: ADD_SELECTED_PICTURE,
  payload,
});
export const deleteSelectedPicture = payload => ({
  type: DELETE_SELECTED_PICTURE,
  payload,
});
export const clearSelectedPicture = () => ({
  type: CLEAR_SELECTED_PICTURE,
});

export const addSelectedCrop = payload => ({
  type: ADD_SELECTED_CROP,
  payload,
});
export const deleteSelectedCrop = () => ({ type: DELETE_SELECTED_CROP });

export function* pictureSaga() {
  yield takeEvery(GET_PICTURES, getPicturesSaga);
  yield takeEvery(ADD_PICTURE, addPictureSaga);
  yield takeEvery(DELETE_PICTURE, deletePictureSaga);
}

const initialState = {
  pictures: [],
  selectedPictures: [],
  selectedCrop: null,
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
    case ADD_SELECTED_PICTURE:
      return {
        ...state,
        selectedPictures: state.selectedPictures.concat(action.payload),
      };
    case DELETE_SELECTED_PICTURE:
      return {
        ...state,
        selectedPictures: state.selectedPictures.filter(
          item => item !== action.payload,
        ),
      };
    case CLEAR_SELECTED_PICTURE:
      return {
        ...state,
        selectedPictures: [],
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
