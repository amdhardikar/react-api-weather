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
            .then((dailyInfo) => dailyInfo.slice(1,8))
            .then((resdata) => dispatch(GETDAILYFORECAST(resdata)))
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
               <div key={index} className="dayweather__card">
                  <div className="dayweather__month daily_content">
                     {dayVal} {monthName[month]}
                  </div>
                  <img
                     src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                     alt={day.weather[0].main}
                     className="dayweather__img daily_content"
                  />
                  <div className="dayweather__temp daily_content">
                     <p>{`${day.temp.day}°c`}</p>
                  </div>
                  <div className="daily_content">
                     <p>{day.weather[0].main}</p>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default Day
