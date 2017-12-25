let initialState = {
    location: '',
    geolocation: {},
    dataForGivenLocation: {},
    dataForGivenLocationF: {},
    unitOfMeasure: false,
    loading: false,
    errorMessage: ''
}

const weatherReducer = (state = initialState, action) => {

    let {dataForGivenLocation, dataForGivenLocationF} = state;

    switch (action.type) {

        case 'UPDATE_LOCATION_NAME':
            return {...state, location: action.payload}

        case 'FIND_BY_LOCATION':
            dataForGivenLocation = {
                generalData: action.payload.generalData,
                specificData: action.payload.specificData
            }
            dataForGivenLocationF = {
                generalDataFahrenheit: action.payload.generalDataFahrenheit,
                specificDataFahrenheit: action.payload.specificDataFahrenheit
            }
            return {...state, dataForGivenLocation, dataForGivenLocationF}

        case 'FIND_BY_LOCATION_ERROR':
            return {...state, errorMessage: action.payload}

        case 'FIND_BY_GEOLOCATION':

            dataForGivenLocation = {
                generalData: action.payload.generalData,
                specificData: action.payload.specificData
            }

            dataForGivenLocationF = {
                generalDataFahrenheit: action.payload.generalDataFahrenheit,
                specificDataFahrenheit: action.payload.specificDataFahrenheit
            }
            return {...state, dataForGivenLocation, dataForGivenLocationF};

        case 'FIND_BY_GEOLOCATION_ERROR':
            return {...state, errorMessage: action.payload}

        default:
            return {...state}
    }
}

export default weatherReducer;