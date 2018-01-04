import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import '../style/App.css';
import PropTypes from 'prop-types';

import { LoadingScreen } from '../components';

import { updateLocationName } from '../actions/weatherAction';

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const { location } = this.props;
    if (location.length > 0) {
      // this.props.findByLocation(location);
      this.props.showResuts();
    }
  }

  handleChange(e) {
    let location = e.target.value;
    this.props.updateLocationName(location);
  }

  handleClick() {
    this.props.showResuts();
    // this.props.findByGeoLocation();
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
  location: PropTypes.string.isRequired,
  updateLocationName: PropTypes.func.isRequired,
  showResuts: PropTypes.func.isRequired
};

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
    showResuts() {
      dispatch(push('/search'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
