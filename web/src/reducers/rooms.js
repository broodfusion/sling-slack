import {
  CREATE_ROOM_SUCCESS,
  FETCH_ROOMS_SUCCESS,
  FETCH_USER_ROOMS_SUCCESS,
  ROOM_JOINED
} from '../actions/type';

const initialState = {
  all: [],
  currentUserRooms: []
};

export default function(state = initialState, action) {
  if (action.type === FETCH_ROOMS_SUCCESS) {
    return {
      ...state,
      all: action.payload
    };
  }

  if (action.type === FETCH_USER_ROOMS_SUCCESS) {
    return {
      ...state,
      currentUserRooms: action.payload
    };
  }
  if (action.type === CREATE_ROOM_SUCCESS) {
    return {
      ...state,
      all: [action.payload, ...state.all],
      currentUserRooms: [...state.currentUserRooms, action.payload]
    };
  }
  if (action.type === ROOM_JOINED) {
    return {
      ...state,
      currentUserRooms: [...state.currentUserRooms, action.payload]
    };
  }
  return state;
}
