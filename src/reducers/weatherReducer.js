const initialState = {
   location: '',
   latitude: '',
   longitude: '',
   currentdata: {},
   hourlydata: [],
   dailydata: []
}

export const weatherReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case 'SETCOORDINATES':
         return {
            ...state,
            latitude: payload.latitude,
            longitude: payload.longitude
         }
      case 'CHANGELOCATION':
         return {
            ...state,
            location: payload,
         }
      case 'GETCURRENTWEATHER':
         return {
            ...state,
            currentdata: payload,
         }
      case 'GETHOURLYFORECAST':
         return {
            ...state,
            hourlydata: payload,
         }
      case 'GETDAILYFORECAST':
         return {
            ...state,
            dailydata: payload,
         }
      default:
         return state
   }
}