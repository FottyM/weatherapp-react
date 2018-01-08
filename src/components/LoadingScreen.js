import PropTypes from 'prop-types';
import React from 'react';
import '../style/App.css';

import { capitalize } from '../helpers';

const LoadingScreen = props => {
  const { errorMessage, errorMessageGeolocation } = props;

  const renderError = message => {
    if (message.length > 0 && typeof message !== 'undefined') {
      return <p className="red-alert">{capitalize(message)}</p>;
    }
  };

  return (
    <div className="home-container">
      <div />
      <div>
        <i className="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true" />
        <p>Loading...</p>
        {renderError(errorMessage)}
        {renderError(errorMessageGeolocation)}
      </div>
      <div />
    </div>
  );
};

export default LoadingScreen;

LoadingScreen.propTypes = {
  errorMessage: PropTypes.string,
  errorMessageGeolocation: PropTypes.string
};
