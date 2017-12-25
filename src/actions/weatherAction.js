import axios from 'axios';
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
                    payload: error.response.data
                })
            })
    }
}

export function findByGeoLocation(){
    return disptach => {
    navigator.geolocation.getCurrentPosition(
        async (coordinates) => {
            const gdata = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&units=metric&cnt=7&APPID=${API_KEY}`)
                .then(res => res.data)
                .catch(error => error);

            const sdata = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&units=metric&APPID=${API_KEY}`)
                .then(res => res.data)
                .catch(error => error);

            const gdataF = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&units=imperial&cnt=7&APPID=${API_KEY}`)
                .then(res => res.data)
                .catch(error => error);

            const sdataF = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&units=imperial&APPID=${API_KEY}`)
                .then(res => res.data)
                .catch(error => error);

            disptach({
                type: 'FIND_BY_GEOLOCATION',
                payload: { gdata, sdata, gdataF, sdataF}
            })
        },
        (error) => {
            disptach({
                type: 'FIND_BY_GEOLOCATION_ERROR',
                payload: error
            });
        })
    }

}

export function updateLocationName(location) {
    return {
        type:'UPDATE_LOCATION_NAME',
        payload: location
    }
}

async function geoLocation() {
    // let response = await navigator.ge
}
