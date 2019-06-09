import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { App, Result } from './containers';
import { loadState } from './localStore';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import './index.css';
import { FourOFour } from './components';

const persistedState = loadState();
const store = configureStore(persistedState);

const MainApp = () => (
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <div className="mother-box">
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/search" component={Result} />
            <Route component={FourOFour} />
          </Switch>
        </div>
      </React.StrictMode>
    </Router>
  </Provider>
);

ReactDOM.render(<MainApp />, document.getElementById('app'));
registerServiceWorker();
