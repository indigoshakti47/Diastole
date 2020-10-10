import { SET_USER, LOGOUT } from './actionTypes';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const _logout = () => ({
  type: LOGOUT,
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch(setUser(null));
  dispatch(_logout());
};
