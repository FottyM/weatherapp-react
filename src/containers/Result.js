import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import moment from 'moment'

import '../style/Result.css';
import {changeUnit} from "../actions/weatherAction";

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

    changedUnitOfMeasure(unit){
        const { dataForGivenLocation, dataForGivenLocationF } =  this.props;
        return unit === 'c' ? dataForGivenLocation : dataForGivenLocationF;
    }

    toggleUnitOfMeasure(e){
        let toggle = e.target.checked;
        console.log(toggle, 'toggle');
        return toggle ? this.props.changeUnit('f') : this.props.changeUnit('c')
    }

    render(){
        let days = Array(7).fill('');
        let todaysDate = moment().format('dddd, MMMM Do YYYY');
        const unit = this.props.unitOfMeasure;
        let data = this.changedUnitOfMeasure(unit);

        return(
            <div className="container">
                <div className="header">  <h2> <span>back</span> { data.city.name }</h2></div>
                <div className="switch"><input type="checkbox" onClick={ (e) => this.toggleUnitOfMeasure(e) }/></div>
                <div className="date-day">
                    <h1>{ todaysDate } </h1>
                    <h2> {   } </h2>
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
    return{
        changeUnit(unit) {
            dispatch(changeUnit(unit))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
