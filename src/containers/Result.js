import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import renderHTML from 'react-render-html';
import '../style/weather-icons/css/weather-icons.css';

import '../style/Result.css';
import arrow from '../style/back.svg';
import {
  changeUnit,
  findByGeoLocation,
  findByLocation,
  goBack
} from '../actions/weatherAction';
import { capitalize } from '../helpers';
import { FullDayForecast } from '../components';
import LoadingScreen from '../components/LoadingScreen';

class Result extends Component {
  goBack() {
    this.props.goBack();
  }
  componentWillMount() {
    console.log('componentWillMount');
    const { location, currentGeolocation } = this.props;
    if (location.length > 0) {
      this.props.findByLocation(location);
    }

    if (Object.keys(currentGeolocation).length > 0) {
      this.props.findByGeoLocation();
    }
  }

  renderHourlyTemp(data) {
    data = Object.keys(data || {})
      .map(key => {
        if (key !== 'min' && key !== 'max') {
          return { [key]: data[key] };
        }
      })
      .filter(x => x);

    return <FullDayForecast data={data} setSymbol={this.setSymbol()} />;
  }

  setDay(date) {
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

  setSymbol() {
    if (this.props.unitOfMeasure === 'f') {
      return renderHTML('&#8457;'); //degree F
    }
    return renderHTML('&#8451;'); //degree C
  }

  showIconDayAndNightShift(code) {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const prefix = 'wi wi-owm';
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      if (hours < 6 || hours >= 18) {
        return `${prefix}-night-${code}`;
      }

      if (hours >= 6 && hours < 18) {
        return `${prefix}-day-${code}`;
      }
    }

    return prefix + '-' + code;
  }

  renderSevenDaysForecast(el, i) {
    const id = el.weather[0].id;
    return (
      <div key={i}>
        <p>{this.setDay(i)}</p>
        <p className="bigger-icon">
          <i className={this.showIconDayAndNightShift(id)} />
        </p>
        <p>{`${el.temp.day} ${this.setSymbol()}`}</p>
      </div>
    );
  }

  changedUnitOfMeasure(unit) {
    const { dataForGivenLocation, dataForGivenLocationF } = this.props;
    return unit === 'c' ? dataForGivenLocation : dataForGivenLocationF;
  }

  toggleUnitOfMeasure(e) {
    let toggle = e.target.checked;
    return toggle ? this.props.changeUnit('f') : this.props.changeUnit('c');
  }

  render() {
    const todaysDate = moment().format('dddd, MMMM Do YYYY'),
      unit = this.props.unitOfMeasure,
      data = this.changedUnitOfMeasure(unit),
      sevenDaysForecast = data.generalData.list;
    const { loading, errorMessage, errorMessageGeolocation } = this.props;

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
        <div className="container">
          <div className="header">
            <div className="arrow">
              <img src={arrow} onClick={() => this.goBack()} />
            </div>
            <div className="">
              <h2>{data.specificData.name}</h2>
            </div>
          </div>
          <div className="switch-container">
            <label className="switch">
              <input
                type="checkbox"
                onClick={e => this.toggleUnitOfMeasure(e)}
              />
              <div className="slider round">
                <span className="on">&#8451;</span>
                <span className="off">&#8457;</span>
              </div>
            </label>
          </div>
          <div className="date-day">
            <h1>{todaysDate} </h1>
            <h2> {capitalize(data.specificData.weather[0].description)} </h2>
          </div>
          <div className="big-temp orange">
            <h2>{`${Math.floor(
              data.specificData.main.temp
            )} ${this.setSymbol()}`}</h2>
          </div>
          <div className="big-icon orange">
            <h2>
              <i
                className={this.showIconDayAndNightShift(
                  data.specificData.weather[0].id
                )}
              />
            </h2>
          </div>
          <div className="daily-forecast orange">
            {this.renderHourlyTemp(data.generalData.list[0].temp)}
          </div>
          <div className="days-forecast">
            {sevenDaysForecast.map((el, index) =>
              this.renderSevenDaysForecast(el, index)
            )}
          </div>
        </div>
      );
    };

    return <div>{isLoading(loading)}</div>;
  }
}

Result.propTypes = {
  changeUnit: PropTypes.any.isRequired,
  dataForGivenLocation: PropTypes.object.isRequired,
  dataForGivenLocationF: PropTypes.object.isRequired,
  goBack: PropTypes.any,
  unitOfMeasure: PropTypes.string.isRequired,
  location: PropTypes.string
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
    },
    goBack() {
      dispatch(goBack());
    },
    findByLocation(location) {
      dispatch(findByLocation(location));
    },
    findByGeoLocation() {
      dispatch(findByGeoLocation());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
