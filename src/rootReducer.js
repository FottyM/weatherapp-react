import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import weatherReducer from './reducers/weatherReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    weatherReducer
  });
