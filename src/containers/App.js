import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/App.css';
import PropTypes from 'prop-types';

import { LoadingScreen } from '../components';
import { capitalize } from '../helpers';

import {
  findByLocation,
  updateLocationName,
  findByGeoLocation
} from '../actions/weatherAction';

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const { location } = this.props;
    if (location.length > 0) {
      this.props.findByLocation(location);
    }
  }

  handleChange(e) {
    let location = e.target.value;
    this.props.updateLocationName(location);
  }

  renderError(message) {
    if (message.length > 0) {
      return <p className="red-alert">{capitalize(message)}</p>;
    }
  }

  handleClick() {
    this.props.findByGeoLocation();
  }

  render() {
    const {
      location,
      loading,
      errorMessage,
      errorMessageGeolocation
    } = this.props;

    const isLoading = loading => {
      if (loading) {
        return (
          <LoadingScreen
            errorMessage={errorMessage}
            errorMessageGeolocation={errorMessageGeolocation}
          />
        );
      }
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
    };

    return <div>{isLoading(loading)}</div>;
  }
}

App.propTypes = {
  errorMessage: PropTypes.string,
  errorMessageGeolocation: PropTypes.string,
  findByGeoLocation: PropTypes.func.isRequired,
  findByLocation: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.string.isRequired,
  updateLocationName: PropTypes.func.isRequired,
  dataForGivenLocation: PropTypes.object,
  dataForGivenLocationF: PropTypes.object,
  unitOfMeasure: PropTypes.string
};

const mapStateToProps = state => {
  return {
    ...state.weatherReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findByLocation(location) {
      dispatch(findByLocation(location));
    },
    updateLocationName(location) {
      dispatch(updateLocationName(location));
    },
    findByGeoLocation() {
      dispatch(findByGeoLocation());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
