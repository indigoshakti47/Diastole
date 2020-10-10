import { SET_USER } from './actionTypes';
import fire from '../fire';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const login = ({ email, password }) => async (dispatch) => {
  const { user } = await fire.auth().signInWithEmailAndPassword(email, password);
  dispatch(setUser(user));
};

export const logout = () => (dispatch) => {
  fire.auth().signOut();
  console.log('before...')
  dispatch(setUser(null));
};
