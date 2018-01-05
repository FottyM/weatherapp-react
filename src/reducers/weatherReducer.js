import moment from 'moment';

let initialState = {
  location: '',
  currentGeolocation: {},
  dataForGivenLocation: {},
  dataForGivenLocationF: {},
  unitOfMeasure: 'c',
  loading: false,
  errorMessage: '',
  errorMessageGeolocation: '',
  timeStamp: moment().format()
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION_NAME':
      return {
        ...state,
        location: action.payload
      };

    case 'FIND_BY_LOCATION':
      return {
        ...state,
        ...action.payload,
        errorMessage: '',
        errorMessageGeolocation: '',
        currentGeolocation: {}
      };

    case 'FIND_BY_LOCATION_ERROR':
      return {
        ...state,
        errorMessage: action.payload
      };

    case 'FIND_BY_GEOLOCATION':
      return {
        ...state,
        ...action.payload,
        errorMessage: '',
        errorMessageGeolocation: '',
        location: '',
        currentGeolocation: {
          ...action.payload.currentGeolocation
        }
      };

    case 'FIND_BY_GEOLOCATION_ERROR':
      return {
        ...state,
        errorMessageGeolocation: action.payload
      };

    case 'START_LOADING':
      return {
        ...state,
        loading: true
      };

    case 'STOP_LOADING':
      return {
        ...state,
        loading: false
      };

    case 'CHANGE_UNIT':
      return {
        ...state,
        unitOfMeasure: action.payload
      };

    case 'CLEAR_LOCATION':
      return {
        ...state,
        location: ''
      };

    default:
      return {
        ...state
      };
  }
};

export default weatherReducer;
