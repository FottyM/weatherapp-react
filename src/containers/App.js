import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/App.css';
import PropTypes from 'prop-types';

import {
  findByLocation,
  updateLocationName,
  findByGeoLocation
} from '../actions/weatherAction';

class App extends Component {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { location } = this.props;
    if (location.length > 0) {
      this.props.findByLocation(location);
    }
    return;
  }

  handleChange(e) {
    let location = e.target.value;
    this.props.updateLocationName(location);
  }

  renderError(errorMessage) {
    if (errorMessage.length > 0) {
      return <p className="red-alert">{this.capitalize(errorMessage)}</p>;
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

    console.log(errorMessageGeolocation, 'container');

    const isLoading = loading => {
      if (loading) {
        return (
          <div className="home-container">
            <div />
            <div>
              <i
                className="fa fa-refresh fa-spin fa-3x fa-fw"
                aria-hidden="true"
              />
              <p>Loading...</p>
              {this.renderError(errorMessage)}
              {this.renderError(errorMessageGeolocation)}
            </div>
            <div />
          </div>
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
  findByLocation: PropTypes.func.isRequired,
  updateLocationName: PropTypes.func.isRequired,
  findByGeoLocation: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  dataForGivenLocation: PropTypes.object,
  dataForGivenLocationF: PropTypes.object,
  unitOfMeasure: PropTypes.string,
  loading: PropTypes.bool,
  errorMessage: PropTypes.object
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
