import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
// import thunk from 'redux-thunk'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Route } from 'react-router'

import './index.css';
import App from './App';
import Result from './containers/Result'

import registerServiceWorker from './registerServiceWorker';
import logger from "redux-logger";
import weatherReducer from "./reducers/weatherReducer";

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(combineReducers({
    weatherReducer,
    router: routerReducer
}), {}, applyMiddleware(logger, thunk, middleware));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/search" component={Result}/>
            </div>
        </ConnectedRouter>
        {/*<App />*/}
    </Provider>
    ,
    document.getElementById('app'));
registerServiceWorker();
