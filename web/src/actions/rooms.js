import axios from 'axios';
import {
  CREATE_ROOM_SUCCESS,
  FETCH_ERROR,
  FETCH_ROOMS_SUCCESS,
  FETCH_USER_ROOMS_SUCCESS,
  ROOM_JOINED
} from './type';

const API = process.env.REACT_APP_API_URL;

export const fetchRooms = () => async dispatch => {
  try {
    const response = await axios.get(`${API}/rooms`);
    dispatch({ type: FETCH_ROOMS_SUCCESS, payload: response.data.data });
  } catch (e) {
    dispatch({ type: FETCH_ERROR, payload: 'Fetch rooms failed!' });
  }
};

export const fetchUserRooms = userID => async dispatch => {
  try {
    const response = await axios.get(`${API}/users/${userID}/rooms`);
    dispatch({ type: FETCH_USER_ROOMS_SUCCESS, payload: response.data.data });
  } catch (e) {
    dispatch({ type: FETCH_ERROR, payload: 'Fetch user rooms failed!' });
  }
};

export const createRoom = (data, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API}/rooms`, data);
    dispatch({ type: CREATE_ROOM_SUCCESS, payload: response.data.data });
    callback();
  } catch (e) {
    dispatch({ type: FETCH_ERROR, payload: 'Create room failed!' });
  }
};

export const joinRoom = (roomID, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API}/rooms/${roomID}/join`);
    dispatch({ type: ROOM_JOINED, payload: response.data.data });
    callback();
  } catch (e) {
    dispatch({ type: FETCH_ERROR, payload: 'Unable to join room!' });
  }
};
