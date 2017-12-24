import axios from 'axios'

const API_KEY = 'b38372affa89f7dbc0f84a3750726835';

export function findByLocation(location) {
    return dispatch => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&cnt=7&APPID=${API_KEY}`)
            .then( res => {
                dispatch({
                    type:'FIND_BY_LOCATION',
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch({
                    type:'FIND_BY_LOCATION_ERROR',
                    payload: error
                })
            })
    }
}

export function updateLocationName(location) {
    return {
        type:'UPDATE_LOCATION_NAME',
        payload: location
    }
}
