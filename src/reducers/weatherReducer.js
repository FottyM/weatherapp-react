let initialState = {
  location: '',
  dataForGivenLocation: {},
  dataForGivenLocationF: {},
  unitOfMeasure: 'c',
  loading: false,
  errorMessage: {}
};

const weatherReducer = (state = initialState, action) => {
  let { dataForGivenLocation, dataForGivenLocationF } = state;

  switch (action.type) {
    case 'UPDATE_LOCATION_NAME':
      return { ...state, location: action.payload };

    case 'FIND_BY_LOCATION':
      dataForGivenLocation = {
        generalData: action.payload.generalData,
        specificData: action.payload.specificData
      };
      dataForGivenLocationF = {
        generalData: action.payload.generalDataFahrenheit,
        specificData: action.payload.specificDataFahrenheit
      };
      return {
        ...state,
        dataForGivenLocation,
        dataForGivenLocationF,
        errorMessage: {}
      };

    case 'FIND_BY_LOCATION_ERROR':
      return { ...state, errorMessage: action.payload };

    case 'FIND_BY_GEOLOCATION':
      dataForGivenLocation = {
        generalData: action.payload.generalData,
        specificData: action.payload.specificData
      };

      dataForGivenLocationF = {
        generalData: action.payload.generalDataFahrenheit,
        specificData: action.payload.specificDataFahrenheit
      };
      return {
        ...state,
        dataForGivenLocation,
        dataForGivenLocationF,
        errorMessage: {}
      };

    case 'FIND_BY_GEOLOCATION_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'START_LOADING':
      // debugger
      return { ...state, loading: action.payload };
    case 'STOP_LOADING':
      // debugger;
      return { ...state, loading: action.payload };
    case 'CHANGE_UNIT':
      return { ...state, unitOfMeasure: action.payload };

    default:
      return { ...state };
  }
};

export default weatherReducer;
