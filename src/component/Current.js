import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CHANGELOCATION, GETCURRENTWEATHER, SETCOORDINATES } from '../actions'
import { apiKey, baseUrl } from '../api/index'

const Current = () => {
   const location = useSelector((state) => state.weather.location)
   const latitude = useSelector((state) => state.weather.latitude)
   const longitude = useSelector((state) => state.weather.longitude)
   const currentdata = useSelector((state) => state.weather.currentdata)

   const dispatch = useDispatch()

   const getWeatherInfo = async () => {
      let weatherInfo = {}

      if (location !== '') {
         const currUrl = `${baseUrl}weather?q=${location}&units=metric&appid=${apiKey}`
         const response = await fetch(currUrl)
         const data = await response.json()
         dispatch(
            SETCOORDINATES({
               latitude: data.coord.lat,
               longitude: data.coord.lon,
            })
         )
         weatherInfo = {
            country: data.sys.country,
            temperature: data.main.temp,
            feelslike: data.weather[0].main,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon,
         }
         dispatch(GETCURRENTWEATHER(weatherInfo))
      }
      if (location === '' && latitude !== '' && longitude !== '') {
         const currUrl = `${baseUrl}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
         const response = await fetch(currUrl)
         const data = await response.json()
         dispatch(CHANGELOCATION(data.name))
         weatherInfo = {
            country: data.sys.country,
            temperature: data.main.temp,
            feelslike: data.weather[0].main,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon,
         }
         dispatch(GETCURRENTWEATHER(weatherInfo))
      }
   }

   useEffect(() => {
      getWeatherInfo()
   }, [location, latitude, longitude])

   return (
      <div className="current-weather">
         <div className="current-weather__content col">
            <p className="current-weather__temp content">
               {`${currentdata.temperature} °c`}
            </p>
            <p className="current-weather__description content">
               {currentdata.feelslike}
            </p>
         </div>
         <div className="current-weathr__image col">
            <img
               src={`http://openweathermap.org/img/wn/${currentdata.icon}@4x.png`}
               alt={currentdata.feelslike}
            />
            <p className="current-weather__location content">
               {`${location}, ${currentdata.country}`}
            </p>
         </div>
         <div className="current-weather__extra col">
            <div className="current-weather__humidity">
               <h1 className="content">Humidity</h1>
               <p className="content">{`${currentdata.humidity} %`}</p>
            </div>
            <hr />
            <div className="current-weather__pressure">
               <h1 className="content">Air Pressure</h1>
               <p className="content">{`${currentdata.pressure} hPa`}</p>
            </div>
            <hr />
            <div className="current-weather__wind">
               <h1 className="content">Wind Speed</h1>
               <p className="content">{`${currentdata.windSpeed} km/h`}</p>
            </div>
         </div>
      </div>
   )
}

export default Current
