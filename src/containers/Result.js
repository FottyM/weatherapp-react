import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import renderHTML from 'react-render-html';
import '../style/weather-icons/css/weather-icons.css';

import '../style/Result.css';
import { changeUnit } from '../actions/weatherAction';

class Result extends Component {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderHourlyTemp(data) {
    data = Object.keys(data || {})
      .map(key => {
        if (key !== 'min' && key !== 'max') {
          return { [key]: data[key] };
        }
      })
      .filter(x => x);

    return (
      <table>
        <tr>
          <td>Morning</td>
          <td>
            {data[3].morn} {this.symbol()}
          </td>
        </tr>
        <tr>
          <td>Day</td>
          <td>
            {' '}
            {data[0].day} {this.symbol()}
          </td>
        </tr>
        <tr>
          <td>Evening</td>
          <td>
            {data[2].eve} {this.symbol()}{' '}
          </td>
        </tr>
        <tr>
          <td>Night</td>
          <td>
            {data[1].night} {this.symbol()}
          </td>
        </tr>
      </table>
    );
  }

  setDay() {
    let date = moment().format('MMMM Do YYYY, h:mm:ss a');
    let today = new Date();
    today = today.setDate(today.getDate() + date);
    today = new Date(today).getDay();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    return days[today];
  }

  symbol() {
    if (this.props.unitOfMeasure === 'f') {
      return renderHTML('&#8457;'); //degree F
    }
    return renderHTML('&#8451;'); //degree C
  }

  dayAndNightShift() {
    let currentTime = new Date();
    let hours = currentTime.getHours();

    if (hours < 6 || hours >= 18) return 'night-';

    if (hours >= 6 && hours < 18) return 'day-';
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
    const { dataForGivenLocation, dataForGivenLocationF } = this.props;
    return unit === 'c' ? dataForGivenLocation : dataForGivenLocationF;
  }

  toggleUnitOfMeasure(e) {
    let toggle = e.target.checked;
    console.log(toggle, 'toggle');
    return toggle ? this.props.changeUnit('f') : this.props.changeUnit('c');
  }

  render() {
    const todaysDate = moment().format('dddd, MMMM Do YYYY'),
      unit = this.props.unitOfMeasure,
      data = this.changedUnitOfMeasure(unit),
      sevenDaysForecast = data.generalData.list;
    // let dailyForecst = data.generalData.list[0].temp

    return (
      <div className="container">
        <div className="header">
          <h2>
            <span>back</span> {data.specificData.name}
          </h2>
        </div>
        <div className="switch">
          <input type="checkbox" onClick={e => this.toggleUnitOfMeasure(e)} />
        </div>
        <div className="date-day">
          <h1>{todaysDate} </h1>
          <h2> {this.capitalize(data.specificData.weather[0].description)} </h2>
        </div>
        <div className="big-temp orange">
          {' '}
          <h2>
            {data.specificData.main.temp} {this.symbol()}
          </h2>
        </div>
        <div className="big-icon orange">
          <h2>
            <i className={`wi wi-owm-${data.specificData.weather[0].id}`} />
          </h2>
        </div>
        <div className="daily-forecast orange">
          {this.renderHourlyTemp(data.generalData.list[0].temp)}
        </div>
        <div className="days-forecast">
          {sevenDaysForecast.map((el, index) =>
            this.renderSevenDaysForecast(index)
          )}
        </div>
      </div>
    );
  }
}

Result.propTypes = {
  changeUnit: PropTypes.any.isRequired,
  dataForGivenLocation: PropTypes.object.isRequired,
  dataForGivenLocationF: PropTypes.object.isRequired,
  unitOfMeasure: PropTypes.string.isRequired,
  location: PropTypes.string,
  errorMessage: PropTypes.object
};

const mapStateToProps = state => {
  return {
    ...state.weatherReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUnit(unit) {
      dispatch(changeUnit(unit));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
