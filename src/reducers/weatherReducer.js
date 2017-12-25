let initialState = {
    location: '',
    geolocation: {},
    dataForGivenLocation: {},
    dataForCurrTime: {},
    dataForGivenLocationF:{},
    dataForCurrTimeF:{},
    unitOfMeasure:false,
    loading: false,
    message: ''
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type){
        case 'FIND_BY_LOCATION':
            return {...state, dataForGivenLocation: action.payload}
        case 'UPDATE_LOCATION_NAME':
            return {...state, location: action.payload }
        case 'FIND_BY_LOCATION_ERROR':
            return {...state, message: action.payload}
        case 'FIND_BY_GEOLOCATION':
            return {...state, }
        case 'FIND_BY_GEOLOCATION_ERROR':
            return {...state, message: action.payload }
        default:
            return {...state}
    }
}

export default weatherReducer;