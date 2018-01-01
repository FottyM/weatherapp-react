import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux';
import { Route } from 'react-router';
import throttle from 'lodash/throttle';

import './index.css';
import App from './App';
import Result from './containers/Result';
import { loadState, saveState } from './localStore';

import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';
import weatherReducer from './reducers/weatherReducer';

const history = createHistory();
const middleware = routerMiddleware(history);
const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    weatherReducer,
    router: routerReducer
  }),
  persistedState,
  composeEnhancers(applyMiddleware(logger, thunk, middleware))
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Result} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
