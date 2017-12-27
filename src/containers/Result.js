import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import moment from 'moment'
import 'weather-icons/css/weather-icons.css'

import '../style/Result.css';
import {changeUnit} from "../actions/weatherAction";

class Result extends Component {

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    dailyForecast(object) {

    }

    renderHourlyTemp() {
        return (
            <li></li>
        )
    }

    renderSevenDaysForecast(i) {
        return (
            <div key={i}>
                <p>Tue</p>
                <p>Logo</p>
                <p>Temp</p>
            </div>
        );
    }

    changedUnitOfMeasure(unit) {
        const {dataForGivenLocation, dataForGivenLocationF} = this.props;
        return unit === 'c' ? dataForGivenLocation : dataForGivenLocationF;
    }

    toggleUnitOfMeasure(e) {
        let toggle = e.target.checked;
        console.log(toggle, 'toggle');
        return toggle ? this.props.changeUnit('f') : this.props.changeUnit('c')
    }

    render() {

        const todaysDate = moment().format('dddd, MMMM Do YYYY'),
            unit = this.props.unitOfMeasure,
            data = this.changedUnitOfMeasure(unit),
            sevenDaysForecast = data.generalData.list;
        // let dailyForecst = data.generalData.list[0].temp

        return (
            <div className="container">
                <div className="header"><h2><span>back</span> {data.specificData.name}</h2></div>
                <div className="switch"><input type="checkbox" onClick={(e) => this.toggleUnitOfMeasure(e)}/></div>
                <div className="date-day">
                    <h1>{todaysDate} </h1>
                    <h2> {this.capitalize(data.specificData.weather[0].description)} </h2>
                </div>
                <div className="big-temp orange">
                    {data.specificData.main.temp}
                </div>
                <div className="big-icon orange">
                    {data.specificData.weather[0].icon}
                    <i className={`wi wi-owm-${data.specificData.weather[0].icon}`}></i>
                    </div>
                <div className="daily-forecast orange">
                    <ul>
                        <li>Mon 40</li>
                        <li>Day 39</li>
                        <li>Eve 32</li>
                        <li>Night 29</li>
                    </ul>
                </div>
                <div className="days-forecast">
                    {sevenDaysForecast.map((el, index) => this.renderSevenDaysForecast(index))}
                </div>
            </div>
        )
    }
}

Result.propTypes = {
    location: PropTypes.string,
    dataForGivenLocation: PropTypes.object.isRequired,
    dataForGivenLocationF: PropTypes.object.isRequired,
    unitOfMeasure: PropTypes.string.isRequired,
    errorMessage: PropTypes.object
};


const mapStateToProps = (state) => {
    return {
        ...state.weatherReducer,
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUnit(unit) {
            dispatch(changeUnit(unit))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
