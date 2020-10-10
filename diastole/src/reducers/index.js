import {
  SET_LOADING,
  SET_USER,
  LOGOUT,
} from '../actions/actionTypes';

import initialState from './initialState';

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: initialState.user,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
