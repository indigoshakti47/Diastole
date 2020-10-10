import { SET_USER, LOGOUT } from './actionTypes';
import fire from '../fire';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const _logout = () => ({
  type: LOGOUT,
});

export const login = ({ email, password }) => async (dispatch) => {
  const { user } = await fire.auth().signInWithEmailAndPassword(email, password);
  dispatch(setUser(user));
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch(setUser(null));
  dispatch(_logout());
};
