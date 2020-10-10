import {
  SET_LOADING,
  SET_USER,
  LOGOUT,
} from '../actions/actionTypes';

import initialState from './initialState';

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem(
        'user',
        JSON.stringify({ ...state.user, ...action.payload }),
      );
      return {
        ...state,
        user: { ...state.user, ...action.payload },
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
