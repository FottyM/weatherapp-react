import {createStore, combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import weatherReducer from './reducers/weatherReducer'

export  default  createStore(combineReducers({weatherReducer}),{},applyMiddleware(logger,thunk))