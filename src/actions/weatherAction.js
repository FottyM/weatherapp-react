import axios from 'axios';
import { push } from 'react-router-redux';
import moment from 'moment';

const API_KEY = 'b38372affa89f7dbc0f84a3750726835';

export function findByLocation(location) {
  const timeStamp = moment().format();

  return async dispatch => {
    dispatch({ type: 'START_LOADING' });

    return await axios
      .all([
        axios.get(findByLocationURL(location, 'c', 'g', API_KEY)),
        axios.get(findByLocationURL(location, 'c', 's', API_KEY)),
        axios.get(findByLocationURL(location, 'f', 'g', API_KEY)),
        axios.get(findByLocationURL(location, 'f', 's', API_KEY))
      ])

      .then(
        axios.spread(
          (
            generalData,
            specificData,
            generalDataFahrenheit,
            specificDataFahrenheit
          ) => {
            dispatch({
              type: 'FIND_BY_LOCATION',
              payload: {
                dataForGivenLocation: {
                  generalData: generalData.data,
                  specificData: specificData.data
                },
                dataForGivenLocationF: {
                  generalData: generalDataFahrenheit.data,
                  specificData: specificDataFahrenheit.data
                },
                timeStamp
              }
            });

            dispatch({ type: 'STOP_LOADING' });
            dispatch(push('/search'));
          }
        )
      )
      .catch(e => {
        dispatch({
          type: 'FIND_BY_LOCATION_ERROR',
          payload: e.response.data.message
        });

        setTimeout(() => {
          dispatch(push('/'));
          dispatch({
            type: 'FIND_BY_LOCATION_ERROR',
            payload: ''
          });

          dispatch({ type: 'STOP_LOADING' });
        }, 3000);
      });
  };
}

export function findByGeoLocation() {
  const timeStamp = moment().format();
  return async dispatch => {
    dispatch({ type: 'START_LOADING' });

    return await navigator.geolocation.getCurrentPosition(
      geolocation => {
        axios
          .all([
            axios.get(findByGeoLocationURL(geolocation, 'c', 'g', API_KEY)),
            axios.get(findByGeoLocationURL(geolocation, 'c', 's', API_KEY)),
            axios.get(findByGeoLocationURL(geolocation, 'f', 'g', API_KEY)),
            axios.get(findByGeoLocationURL(geolocation, 'f', 's', API_KEY))
          ])
          .then(
            axios.spread(
              (
                generalData,
                specificData,
                generalDataFahrenheit,
                specificDataFahrenheit
              ) => {
                dispatch({
                  type: 'FIND_BY_GEOLOCATION',
                  payload: {
                    dataForGivenLocation: {
                      generalData: generalData.data,
                      specificData: specificData.data
                    },
                    dataForGivenLocationF: {
                      generalData: generalDataFahrenheit.data,
                      specificData: specificDataFahrenheit.data
                    },
                    currentGeolocation: {
                      lat: geolocation.coords.latitude,
                      lng: geolocation.coords.longitude
                    },
                    timeStamp
                  }
                });

                dispatch({ type: 'STOP_LOADING' });
              }
            )
          )
          .catch(e => {
            dispatch({
              type: 'FIND_BY_GEOLOCATION_ERROR',
              payload: e.message
            });
            dispatch(push('/'));

            setTimeout(() => {
              dispatch(push('/'));
              dispatch({
                type: 'FIND_BY_GEOLOCATION_ERROR',
                payload: ''
              });
              dispatch({ type: 'STOP_LOADING' });
            }, 3000);
          });
      },
      error => {
        dispatch({
          type: 'FIND_BY_GEOLOCATION_ERROR',
          payload: error.message
        });

        setTimeout(() => {
          dispatch(push('/'));
          dispatch({
            type: 'FIND_BY_GEOLOCATION_ERROR',
            payload: ''
          });
          dispatch({ type: 'STOP_LOADING' });
        }, 3000);
      }
    );
  };
}

export function updateLocationName(location) {
  return {
    type: 'UPDATE_LOCATION_NAME',
    payload: location
  };
}

export function changeUnit(unit) {
  return {
    type: 'CHANGE_UNIT',
    payload: unit
  };
}

export function goBack() {
  return dispatch => dispatch(push('/'));
}

const findByLocationURL = (location, unit, details, API_KEY) => {
  if (unit === 'c' && details === 'g') {
    return `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&cnt=7&APPID=${API_KEY}`;
  } else if (unit === 'c' && details === 's') {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${API_KEY}`;
  } else if (unit === 'f' && details === 'g') {
    return `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=imperial&cnt=7&APPID=${API_KEY}`;
  } else if (unit === 'f' && details === 's') {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${API_KEY}`;
  }
};

const findByGeoLocationURL = (geolocation, unit, details, API_KEY) => {
  if (unit === 'c' && details === 'g') {
    return `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${
      geolocation.coords.latitude
    }&lon=${geolocation.coords.longitude}&units=metric&cnt=7&APPID=${API_KEY}`;
  }

  if (unit === 'c' && details === 's') {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${
      geolocation.coords.latitude
    }&lon=${geolocation.coords.longitude}&units=metric&APPID=${API_KEY}`;
  }

  if (unit === 'f' && details === 'g') {
    return `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${
      geolocation.coords.latitude
    }&lon=${
      geolocation.coords.longitude
    }&units=imperial&cnt=7&APPID=${API_KEY}`;
  }

  if (unit === 'f' && details === 's') {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${
      geolocation.coords.latitude
    }&lon=${geolocation.coords.longitude}&units=imperial&APPID=${API_KEY}`;
  }
};
