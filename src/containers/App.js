import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

import {
  findByGeoLocationAction,
  findByLocationAction,
  updateLocationNameAction
} from '../actions/weatherAction';
import '../style/App.css';

class App extends Component {
  handleSubmit = e => {
    const { showResultsByLocation } = this.props;
    e.preventDefault();
    const { location } = this.props;
    if (location.length > 0 && typeof location !== 'undefined') {
      showResultsByLocation(location);
    }
  };

  handleChange = e => {
    const location = e.target.value;
    const { updateLocationName } = this.props;
    updateLocationName(location);
  };

  handleClick = () => {
    const { location, clearLocation, showResultsByGeolocation } = this.props;

    if (location.length > 0 && typeof location !== 'undefined') {
      clearLocation();
      showResultsByGeolocation();
      return;
    }
    showResultsByGeolocation();
  };

  render() {
    const { location } = this.props;

    return (
      <div className="home-container">
        <div />
        <div>
          <div>
            <form onSubmit={this.handleSubmit} className="embed-submit-field">
              <input
                type="text"
                name="location"
                value={location}
                onChange={this.handleChange}
                placeholder="City"
                className="embed-submit-field"
              />
              <button type="submit" className="fa fa-search" />
            </form>
          </div>
          <div className="texts">
            <p>or</p>
            <p className="center">
              use my
              <span
                onKeyPress={() => {}}
                className="dotted"
                onClick={this.handleClick}
                role="presentation"
              >
                current position
              </span>
            </p>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.weatherReducer
});

const mapDispatchToProps = dispatch => ({
  updateLocationName: location => dispatch(updateLocationNameAction(location)),
  showResultsByLocation: location => {
    if (typeof location !== 'undefined') {
      dispatch(findByLocationAction(location));
      dispatch(push('/search'));
    }
  },
  showResultsByGeolocation() {
    dispatch(findByGeoLocationAction());
    dispatch(push('/search'));
  },
  clearLocation: () => dispatch({ type: 'CLEAR_LOCATION' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

App.propTypes = {
  clearLocation: PropTypes.func,
  location: PropTypes.string.isRequired,
  showResultsByGeolocation: PropTypes.func,
  showResultsByLocation: PropTypes.func,
  updateLocationName: PropTypes.func.isRequired
};
