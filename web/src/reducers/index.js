import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import rooms from './rooms';

const appReducer = combineReducers({
  form,
  auth,
  rooms
});

export default appReducer;
