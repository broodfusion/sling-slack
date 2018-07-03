import axios from 'axios';
import { reset } from 'redux-form';
import api from '../api';
import { AUTHENTICATION_SUCCESS } from './type';

const ROOT_URL = 'http://localhost:4000/api';

function setCurrentUser(dispatch, response) {
  console.log(response);
  localStorage.setItem('token', JSON.stringify(response.token));
  dispatch({ type: AUTHENTICATION_SUCCESS, response });
}

export function login(data) {
  return dispatch => axios.post(`${ROOT_URL}/auth/identity/callback`, data).then((response) => {
    setCurrentUser(dispatch, response);
    dispatch(reset('login'));
  });
}

export function signup(data) {
  return dispatch => axios.post(`${ROOT_URL}/users`, data).then((response) => {
    setCurrentUser(dispatch, response);
    dispatch(reset('signup'));
  });
}

export function logout() {
  return dispatch => api.delete('/sessions').then(() => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  });
}
