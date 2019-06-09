import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';

import { saveState } from './localStore';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );

  return store;
}
