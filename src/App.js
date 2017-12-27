import React, {Component} from 'react';
import {connect} from 'react-redux'
import './App.css';
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'


import {findByLocation, updateLocationName, findByGeoLocation} from './actions/weatherAction'


class App extends Component {

    handleSubmit(e) {
        e.preventDefault();
        const {location} = this.props;
        this.props.findByLocation(location);
    }

    handleChange(e) {
        let location = e.target.value;
        this.props.updateLocationName(location);
    }

    handleClick() {
        this.props.findByGeoLocation();
    }

    render() {
        const {location} = this.props.location;
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" name="location" value={location} onChange={(e) => this.handleChange(e)}/>
                    <p>use my <span onClick={() => this.handleClick()}>current position </span></p>
                    <button type="submit"> fetch</button>
                </form>
            </div>
        );
    }
}

App.propTypes = {

    findByLocation: PropTypes.func.isRequired,
    updateLocationName: PropTypes.func.isRequired,
    findByGeoLocation: PropTypes.func.isRequired,
    location: PropTypes.string,
    geolocation: PropTypes.object,
    dataForGivenLocation: PropTypes.object,
    dataForGivenLocationF: PropTypes.object,
    unitOfMeasure: PropTypes.bool,
    loading: PropTypes.bool,
    errorMessage: PropTypes.object

};

const mapStateToProps = (state) => {
    return {
        ...state.weatherReducer,
        turns: true
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        findByLocation(location) {
            dispatch(findByLocation(location))
        },
        updateLocationName(location) {
            dispatch(updateLocationName(location))
        },
        findByGeoLocation() {
            dispatch(findByGeoLocation())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);



