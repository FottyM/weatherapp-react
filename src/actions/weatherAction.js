import axios from 'axios';

const API_KEY = 'b38372affa89f7dbc0f84a3750726835';

export function findByLocation(location) {
    return async (dispacth) => {
        const generalData = await axios.get(findByLocationURL(location, API_KEY))
            .then((res) => res.data)
            .catch((error) => error.response.data);

        const specificData = await axios.get(findByLocationURL(location, API_KEY))
            .then((res) => res.data)
            .catch((error) => error.response.data);


        const generalDataFahrenheit = await axios.get(findByLocationURL(location, API_KEY))
            .then((res) => res.data)
            .catch((error) => error.response.data);


        const specificDataFahrenheit = await axios.get(findByLocationURL(location, API_KEY))
            .then((res) => res.data)
            .catch((error) => {
                //FIXME: Change it later
                dispacth({
                    type: 'FIND_BY_LOCATION_ERROR',
                    payload: error.response.data
                })
            });
        dispacth({
            type: 'FIND_BY_LOCATION',
            payload: {generalData, specificData, generalDataFahrenheit, specificDataFahrenheit}
        })
    }
}

export function findByGeoLocation() {
    return disptach => {
        navigator.geolocation.getCurrentPosition(
            async (geolocation) => {
                const generalData = await axios.get(finByGeolocationURL(geolocation, API_KEY))
                    .then(res => res.data)
                    .catch(error => error);

                const specificData = await axios.get(finByGeolocationURL(geolocation, API_KEY))
                    .then(res => res.data)
                    .catch(error => error);

                const generalDataFahrenheit = await axios.get(finByGeolocationURL(geolocation, API_KEY))
                    .then(res => res.data)
                    .catch(error => error);

                const specificDataFahrenheit = await axios.get(finByGeolocationURL(geolocation, API_KEY))
                    .then(res => res.data)
                    .catch(error => error);

                disptach({
                    type: 'FIND_BY_GEOLOCATION',
                    payload: {generalData, specificData, generalDataFahrenheit, specificDataFahrenheit}
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
        type: 'UPDATE_LOCATION_NAME',
        payload: location
    }
}

function findByLocationURL(location, API_KEY) {
    return `http://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&cnt=7&APPID=${API_KEY}`
}

function finByGeolocationURL(geolocation, API_KEY) {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${geolocation.coords.latitude}&lon=${geolocation.coords.longitude}&units=imperial&APPID=${API_KEY}`
}

