import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import '../style/App.css';
import PropTypes from 'prop-types';

import {
  findByGeoLocation,
  findByLocation,
  updateLocationName
} from '../actions/weatherAction';

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const { location } = this.props;
    if (location.length > 0 && typeof location !== 'undefined') {
      this.props.showResultsByLocation(location);
    }
  }

  handleChange(e) {
    let location = e.target.value;
    this.props.updateLocationName(location);
  }

  handleClick() {
    const { location } = this.props;

    if (location.length > 0 && typeof location !== 'undefined') {
      this.props.clearLocation();
      this.props.showResultsByGeolocation();
    }

    this.props.showResultsByGeolocation();
  }

  render() {
    const { location } = this.props;

    return (
      <div className="home-container">
        <div />
        <div>
          <div>
            <form
              onSubmit={e => this.handleSubmit(e)}
              className="embed-submit-field"
            >
              <input
                type="text"
                name="location"
                value={location}
                onChange={e => this.handleChange(e)}
                placeholder="City"
                className="embed-submit-field"
              />
              <button type="submit" className="fa fa-search" />
            </form>
          </div>
          <div className="texts">
            <p>or</p>{' '}
            <p className="center">
              use my{' '}
              <span className="dotted " onClick={() => this.handleClick()}>
                current position{' '}
              </span>
            </p>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.weatherReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLocationName(location) {
      dispatch(updateLocationName(location));
    },
    showResultsByLocation(location) {
      if (typeof location !== 'undefined') {
        dispatch(findByLocation(location));
        dispatch(push('/search'));
      }
    },
    showResultsByGeolocation() {
      dispatch(findByGeoLocation());
      dispatch(push('/search'));
    },
    clearLocation() {
      dispatch({ type: 'CLEAR_LOCATION' });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  clearLocation: PropTypes.func,
  location: PropTypes.string.isRequired,
  showResultsByGeolocation: PropTypes.func,
  showResultsByLocation: PropTypes.func,
  updateLocationName: PropTypes.func.isRequired
};
