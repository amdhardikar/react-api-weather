import React, { useEffect, useState } from 'react'
import { createStore } from 'redux'
import './App.css'
import Searchbar from './component/Searchbar'
import Current from './component/Current'
import Hour from './component/Hour'
import Day from './component/Day'
import { reducers } from './reducers'
import { Provider } from 'react-redux'
import nighBackground from './assetes/night.svg'
import afternoonBackground from './assetes/afternoon.svg'
import morningBackground from './assetes/morning.svg'

const store = createStore(reducers)

const App = () => {
   const [lat, setLat] = useState(null)
   const [lon, setLon] = useState(null)

   const appBackground = {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
   }
   const hour = new Date().getHours()

   if (hour >= 4 && hour < 12) {
      appBackground.backgroundImage = `url(${morningBackground})`
   } else if (hour >= 12 && hour < 20) {
      appBackground.backgroundImage = `url(${afternoonBackground})`
   } else {
      appBackground.backgroundImage = `url(${nighBackground})`
   }

   useEffect(() => {
      const getLocation = () => {
         const successCb = (position) => {
            let lat = position.coords.latitude
            let lon = position.coords.longitude

            setLat(lat)
            setLon(lon)
         }
         const errorCb = (error) => {
            console.log(error)
         }
         navigator.geolocation.getCurrentPosition(successCb, errorCb)
      }

      getLocation()
   }, [])

   return (
      <Provider store={store}>
         {lat !== null ? (
            <>
               <div className="App" style={appBackground}>
                  <div className="app-container">
                     <Current />
                  </div>
                  <div className="sub-container">
                     <div className="search-container">
                        <Searchbar lat={lat} lon={lon} />
                     </div>
                     <div className="hour-container">
                        <Hour />
                     </div>
                     <div className="daily-container">
                        <Day />
                     </div>
                  </div>
               </div>
            </>
         ) : (
            <div className="initial-container" style={appBackground}>
               <h1
                  style={{
                     fontSize: '5rem',
                     color: '#000000cf',
                     wordSpacing: '10px',
                  }}>
                  Allow GeoLocation
               </h1>
            </div>
         )}
      </Provider>
   )
}

export default App
