import axios from 'axios';
import { push } from 'react-router-redux';

const API_KEY = 'b38372affa89f7dbc0f84a3750726835';

export function findByLocation(location) {
  return dispatch => {
    dispatch({
      type: 'START_LOADING',
      payload: true
    });

    axios
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
                generalData: generalData.data,
                specificData: specificData.data,
                generalDataFahrenheit: generalDataFahrenheit.data,
                specificDataFahrenheit: specificDataFahrenheit.data
              }
            });

            dispatch({
              type: 'STOP_LOADING',
              payload: false
            });

            dispatch(push('/search'));
          }
        )
      )
      .catch(e => {
        dispatch({
          type: 'FIND_BY_LOCATION_ERROR',
          payload: e.response.data
        });

        setTimeout(() => {
          dispatch({
            type: 'STOP_LOADING',
            payload: false
          });
        }, 3000);
      });
  };
}

export function findByGeoLocation() {
  return dispatch => {
    dispatch({
      type: 'START_LOADING',
      payload: true
    });

    navigator.geolocation.getCurrentPosition(
      async geolocation => {
        axios
          .all([
            axios.get(findByGeoLocationURL(geolocation, 'c', 'g', API_KEY)),
            axios.get(findByGeoLocationURL(geolocation, 'c', 's', API_KEY)),
            axios.get(findByGeoLocationURL(geolocation, 'f', 'g', API_KEY)),
            axios.get(findByGeoLocationURL(geolocation, 'f', 'g', API_KEY))
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
                    generalData: generalData.data,
                    specificData: specificData.data,
                    generalDataFahrenheit: generalDataFahrenheit.data,
                    specificDataFahrenheit: specificDataFahrenheit.data
                  }
                });

                dispatch({
                  type: 'STOP_LOADING',
                  payload: false
                });

                dispatch(push('/search'));
              }
            )
          )
          .catch(e => {});

        // const generalData = await axios
        //   .get(findByGeoLocationURL(geolocation, 'c', 'g', API_KEY))
        //   .then(res => res.data)
        //   .catch(error => error);
        //
        // const specificData = await axios
        //   .get(findByGeoLocationURL(geolocation, 'c', 's', API_KEY))
        //   .then(res => res.data)
        //   .catch(error => error);
        //
        // const generalDataFahrenheit = await axios
        //   .get(findByGeoLocationURL(geolocation, 'f', 'g', API_KEY))
        //   .then(res => res.data)
        //   .catch(error => error);
        //
        // const specificDataFahrenheit = await axios
        //   .get(findByGeoLocationURL(geolocation, 'f', 's', API_KEY))
        //   .then(res => res.data)
        //   .catch(error => error);

        // dispatch({
        //   type: 'FIND_BY_GEOLOCATION',
        //   payload: {
        //     generalData,
        //     specificData,
        //     generalDataFahrenheit,
        //     specificDataFahrenheit
        //   }
        // });
        //
        // dispatch({
        //   type: 'STOP_LOADING',
        //   payload: false
        // });
        //
        // dispatch(push('/search'));
      },
      error => {
        dispatch({
          type: 'FIND_BY_GEOLOCATION_ERROR',
          payload: error
        });

        // setTimeout( () => {
        //
        //   dispatch({
        //         type: 'STOP_LOADING',
        //         payload: false
        //     });
        // }, 5000)
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
    return `http://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&cnt=7&APPID=${API_KEY}`;
  } else if (unit === 'c' && details === 's') {
    return `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${API_KEY}`;
  } else if (unit === 'f' && details === 'g') {
    return `http://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=imperial&cnt=7&APPID=${API_KEY}`;
  } else if (unit === 'f' && details === 's') {
    return `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${API_KEY}`;
  }
};

const findByGeoLocationURL = (geolocation, unit, details, API_KEY) => {
  if (unit === 'c' && details === 'g') {
    return `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${
      geolocation.coords.latitude
    }&lon=${geolocation.coords.longitude}&units=metric&cnt=7&APPID=${API_KEY}`;
  }

  if (unit === 'c' && details === 's') {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${
      geolocation.coords.latitude
    }&lon=${geolocation.coords.longitude}&units=metric&APPID=${API_KEY}`;
  }

  if (unit === 'f' && details === 'g') {
    return `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${
      geolocation.coords.latitude
    }&lon=${
      geolocation.coords.longitude
    }&units=imperial&cnt=7&APPID=${API_KEY}`;
  }

  if (unit === 'f' && details === 's') {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${
      geolocation.coords.latitude
    }&lon=${geolocation.coords.longitude}&units=imperial&APPID=${API_KEY}`;
  }
};
