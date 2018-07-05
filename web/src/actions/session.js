import axios from 'axios';
import api from '../api';
import { AUTH_ERROR, AUTH_USER } from './type';

// const ROOT_URL = 'http://localhost:4000/api';
const API = process.env.REACT_APP_API_URL;

function setCurrentUser(response, dispatch) {
  dispatch({ type: AUTH_USER, payload: response.data.token });
  localStorage.setItem('token', JSON.stringify(response.data.token));
}

export const login = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `${API}/auth/identity/callback`,
      formProps
    );
    setCurrentUser(response, dispatch);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Login failed!' });
  }
};

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API}/auth/signup`, formProps);
    setCurrentUser(response, dispatch);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email or username in use' });
  }
};

// export const logout = () => async dispatch => {
//   try {
//     await axios.delete
//   }
// }

export function logout() {
  return dispatch =>
    api.delete('/sessions').then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    });
}
