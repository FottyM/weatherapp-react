import axios from 'axios';
import { push } from 'react-router-redux'

const API_KEY = 'b38372affa89f7dbc0f84a3750726835';

export function findByLocation(location) {
    return async (dispatch) => {
        const generalData = await axios.get(findByLocationURL(location,'c','g',API_KEY))
            .then((res) => res.data)
            .catch((error) => error.response.data);

        const specificData = await axios.get(findByLocationURL(location,'c','s',API_KEY))
            .then((res) => res.data)
            .catch((error) => error.response.data);


        const generalDataFahrenheit = await axios.get(findByLocationURL(location,'f','g', API_KEY))
            .then((res) => res.data)
            .catch((error) => error.response.data);


        const specificDataFahrenheit = await axios.get(findByLocationURL(location, 'f','g', API_KEY))
            .then((res) => res.data)
            .catch((error) => {
                //FIXME: Change it later
                dispatch({
                    type: 'FIND_BY_LOCATION_ERROR',
                    payload: error.response.data
                })
            });

        dispatch({
            type: 'FIND_BY_LOCATION',
            payload: {generalData, specificData, generalDataFahrenheit, specificDataFahrenheit}
        });

        dispatch(push('/search'));
    }
}

export function findByGeoLocation() {
    return dispatch => {
        navigator.geolocation.getCurrentPosition(
            async (geolocation) => {
                const generalData = await axios.get(findByGeoLocationURL(geolocation,'c','g',API_KEY))
                    .then(res => res.data)
                    .catch(error => error);

                const specificData = await axios.get(findByGeoLocationURL(geolocation,'c','s',API_KEY))
                    .then(res => res.data)
                    .catch(error => error);

                const generalDataFahrenheit = await axios.get(findByGeoLocationURL(geolocation,'f','g', API_KEY))
                    .then(res => res.data)
                    .catch(error => error);

                const specificDataFahrenheit = await axios.get(findByGeoLocationURL(geolocation,'f','s', API_KEY))
                    .then(res => res.data)
                    .catch(error => error);

                dispatch({
                    type: 'FIND_BY_GEOLOCATION',
                    payload: {generalData, specificData, generalDataFahrenheit, specificDataFahrenheit}
                });

                dispatch(push('/search'));

            },
            (error) => {
                dispatch({
                    type: 'FIND_BY_GEOLOCATION_ERROR',
                    payload: error
                });
            })
    }

}

export function updateLocationName(location) {
    return {
        type: 'UPDATE_LOCATION_NAME',
        payload: location
    }
}

export function changeUnit(unit) {
    return{
        type:'CHANGE_UNIT',
        payload: unit
    }
}

function findByLocationURL(location, unit, details,API_KEY) {
    if(unit === 'c' && details === 'g'){
        return `http://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&cnt=7&APPID=${API_KEY}`
    }

    if(unit === 'c' && details === 's'){
        return `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${API_KEY}`
    }

    if(unit === 'f' && details === 'g'){
        return `http://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=imperial&cnt=7&APPID=${API_KEY}`
    }

    if( unit === 'f' && details ==='s'){
        return `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${API_KEY}`
    }

}

function findByGeoLocationURL(geolocation, unit, details,API_KEY) {

    if(unit === 'c' && details ==='g'){
        return `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${geolocation.coords.latitude}&lon=${geolocation.coords.longitude}&units=metric&cnt=7&APPID=${API_KEY}`
    }

    if(unit === 'c' && details ==='s'){
        return `http://api.openweathermap.org/data/2.5/weather?lat=${geolocation.coords.latitude}&lon=${geolocation.coords.longitude}&units=metric&APPID=${API_KEY}`
    }

    if(unit === 'f' && details ==='g'){
        return `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${geolocation.coords.latitude}&lon=${geolocation.coords.longitude}&units=imperial&cnt=7&APPID=${API_KEY}`
    }

    if( unit === 'f' && details ==='s'){
        return `http://api.openweathermap.org/data/2.5/weather?lat=${geolocation.coords.latitude}&lon=${geolocation.coords.longitude}&units=imperial&APPID=${API_KEY}`
    }

}


