import axios from 'axios';
import { fetchUserRooms } from './rooms';
import { AUTH_ERROR, AUTH_USER } from './type';

// const ROOT_URL = 'http://localhost:4000/api';
const API = process.env.REACT_APP_API_URL;

function setCurrentUser(response, dispatch) {
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('userID', response.data.id);
  dispatch({ type: AUTH_USER, payload: response.data.token });
  dispatch(fetchUserRooms(response.data.id));
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

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  return {
    type: AUTH_USER,
    payload: ''
  };
};

// export function logout() {
//   return dispatch =>
//     api.delete('/sessions').then(() => {
//       localStorage.removeItem('token');
//       dispatch({ type: 'LOGOUT' });
//     });
// }
