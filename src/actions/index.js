export const SETCOORDINATES = (data) => {
   return {
      type: 'SETCOORDINATES',
      payload: data,
   }
}

export const CHANGELOCATION = (data) => {
   return {
      type: 'CHANGELOCATION',
      payload: data,
   }
}

export const GETCURRENTWEATHER = (data) => {
   return {
      type: 'GETCURRENTWEATHER',
      payload: data,
   }
}

export const GETHOURLYFORECAST = (data) => {
   return {
      type: 'GETHOURLYFORECAST',
      payload: data,
   }
}

export const GETDAILYFORECAST = (data) => {
   return {
      type: 'GETDAILYFORECAST',
      payload: data,
   }
}
