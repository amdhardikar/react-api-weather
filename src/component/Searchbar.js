import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SETCOORDINATES, CHANGELOCATION } from '../actions'

const Searchbar = () => {
   const [location, setLocation] = useState('')
   const dispatch = useDispatch()

   const onInputChange = (e) => {
      setLocation(e.target.value)
   }

   const onKeyHandler = (e) => {
      if (e.key === 'Enter') {
         dispatch(CHANGELOCATION(location))
         setLocation('')
      }
   }

   useEffect(() => {
      const getLocation = () => {
         const successCb = (position) => {
            let lat = position.coords.latitude
            let lon = position.coords.longitude

            dispatch(SETCOORDINATES({ latitude: lat, longitude: lon }))
         }
         const errorCb = (error) => {
            console.log(error)
         }
         navigator.geolocation.getCurrentPosition(successCb, errorCb)
      }

      getLocation()
   }, [])

   return (
      <div className="main-container">
         <div className="search-container">
            <input
               type="text"
               name="search"
               id="search"
               className="search-container__input"
               value={location}
               placeholder="Location"
               // ref={inputRef}
               onChange={(e) => onInputChange(e)}
               onKeyPress={(e) => onKeyHandler(e)}
            />
         </div>
      </div>
   )
}

export default Searchbar
