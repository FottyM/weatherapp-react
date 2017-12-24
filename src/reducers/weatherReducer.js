let initialState = {
    location: '',
    dataForGivenLocation: {},
    dataForCurrTime: {},
    dataForGivenLocationF:{},
    dataForCurrTimeF:{},
    unitOfMeasure:false,
    loading: false
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type){
        case 'FIND_BY_LOCATION':
            return {...state, dataForGivenLocation: action.payload}
        case 'UPDATE_LOCATION_NAME':
            return {...state, location: action.payload }
        default:
            return {...state}
    }
}

export default weatherReducer;