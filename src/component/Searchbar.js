import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { SETCOORDINATES, CHANGELOCATION } from '../actions'

const Searchbar = ({lat, lon}) => {
   const [location, setLocation] = useState('')
   const dispatch = useDispatch()
   const inputRef = useRef(null)

   const onInputChange = (e) => {
      setLocation(e.target.value)
   }

   const onKeyHandler = (e) => {
      if (e.key === 'Enter') {
         dispatch(CHANGELOCATION(location))
         setLocation('')
         inputRef.current.focus()
      }
   }

   useEffect(() => {
      inputRef.current.focus()
      dispatch(SETCOORDINATES({ latitude: lat, longitude: lon }))
   }, [lat, lon])

   return (
      <div className="main-container">
         <div className="search-container">
            <input
               type="text"
               name="search"
               id="search"
               className="search-container__input"
               value={location}
               placeholder="Another location"
               ref={inputRef}
               onChange={(e) => onInputChange(e)}
               onKeyPress={(e) => onKeyHandler(e)}
            />
         </div>
      </div>
   )
}

export default Searchbar
