import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GETHOURLYFORECAST } from '../actions'
import { apiKey, baseUrl } from '../api/index'

const Hour = () => {
   const hourlydata = useSelector((state) => state.weather.hourlydata)
   const latitude = useSelector((state) => state.weather.latitude)
   const longitude = useSelector((state) => state.weather.longitude)
   const dispatch = useDispatch()

   const fetchData = () => {
      if (latitude !== '' && longitude !== '') {
         const forecastUrl = `${baseUrl}onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,alerts,daily&appid=${apiKey}`
         fetch(forecastUrl)
            .then((res) => res.json())
            .then((data) => data.hourly)
            .then((hourlyInfo) => dispatch(GETHOURLYFORECAST(hourlyInfo)))
      }
   }

   useEffect(() => {
      fetchData()
   }, [latitude, longitude])

   return (
      <div className="hourweather-container">
         {hourlydata.map((hour, index) => {
            let hr = new Date(hour.dt * 1000).getHours()
            let timeSymbol = 'AM'
            if (hr === 0) {
               hr = 12
            } else if (hr === 12) {
               timeSymbol = 'PM'
            } else if (hr > 12) {
               hr -= 12
               timeSymbol = 'PM'
            }

            return (
               <div className="hourweather__card" key={index}>
                  <div className="hourweather__time hour_content">
                     <p>
                        {hr} {timeSymbol}
                     </p>
                  </div>
                  <img
                     src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                     alt={hour.weather[0].main}
                     className="hourweather__img hour_content"
                  />
                  <div className="hourweather__temp hour_content">
                     <p>{`${hour.temp}°c`}</p>
                  </div>
                  <div className="hourweather__condition hour_content">
                     <p>{hour.weather[0].main}</p>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default Hour
