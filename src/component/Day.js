import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GETDAILYFORECAST } from '../actions'
import { baseUrl, apiKey } from '../api'

const Day = () => {
   const dailydata = useSelector((state) => state.weather.dailydata)
   const latitude = useSelector((state) => state.weather.latitude)
   const longitude = useSelector((state) => state.weather.longitude)
   const dispatch = useDispatch()

   let monthName = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
   ]

   const fetchData = async () => {
      if (latitude !== '' && longitude !== ' ') {
         const fetchUrl = `${baseUrl}onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,alerts,hourly&appid=${apiKey}`
         fetch(fetchUrl)
            .then((res) => res.json())
            .then((data) => data.daily)
            .then((dailyInfo) => dispatch(GETDAILYFORECAST(dailyInfo)))
      }
   }

   useEffect(() => {
      fetchData()
   }, [latitude, longitude])

   return (
      <div className="dayweather-container">
         {dailydata.map((day, index) => {
            let dayVal = new Date(day.dt * 1000).getDate()
            let month = new Date(day.dt * 1000).getMonth()

            return (
               <div key={index} className="dayweather-card">
                  <div className="dayweather__month">
                     {dayVal} {monthName[month]}
                  </div>
                  <div className="dayweather__img">
                     <img
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].main}
                     />
                  </div>
                  <div className="dayweather__temp">
                     {Math.floor(day.temp.day)}°c
                  </div>
                  <div className="dayweather__tempmin">{day.temp.min}° min</div>
                  <div className="dayweather__tempmax">{day.temp.max}° max</div>
                  <div className="dayweather__humidity">{day.humidity}%</div>
                  <div className="dayweather__pressure">{day.pressure} hPa</div>
                  <div className="dayweather__wind">{day.wind_speed} km/h</div>
               </div>
            )
         })}
      </div>
   )
}

export default Day
