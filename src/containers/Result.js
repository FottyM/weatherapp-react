import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import moment from 'moment'

import '../style/Result.css';

class Result  extends Component{

    renderSevenDaysForecast(i){
        return (
            <div key={i}>
                <p>Tue</p>
                <p>Logo</p>
                <p>Temp</p>
            </div>
        );
    }

    render(){
        console.log(this.props);
        let days = Array(7).fill('');
        let todaysDate = moment().format('dddd, MMMM Do YYYY');

        const { dataForGivenLocation, dataForGivenLocationF } =  this.props;
        debugger
        return(
            <div className="container">
                <div className="header"> back { dataForGivenLocation.generalData.name } </div>
                <div className="switch">switch</div>
                <div className="date-day">
                    <h1>{ todaysDate } </h1>
                    <h2> {  } </h2>
                </div>
                <div className="big-temp">
                    32 F
                </div>
                <div className="big-icon">Cloud</div>
                <div className="daily-forecast">
                    <ul>
                        <li>Mon 40</li>
                        <li>Day 39</li>
                        <li>Eve 32</li>
                        <li>Night 29</li>
                    </ul>
                </div>
                <div className="days-forecast">
                    { days.map( (el, index) => this.renderSevenDaysForecast(index))}
                </div>
            </div>
        )
    }
}

Result.propTypes = {

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
    }

};

const mapDispatchToProps = (dispatch) => {
    return{

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
