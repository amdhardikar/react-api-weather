import React from 'react'
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

   return (
      <Provider store={store}>
         <div className="App" style={appBackground}>
            <div className="app-container">
               <Current />
            </div>
            <div className="sub-container">
               <div className="search-container">
                  <Searchbar />
               </div>
               <div className="hour-container">
                  <Hour />
               </div>
               <div className="daily-container">
                  <Day />
               </div>
            </div>
         </div>
      </Provider>
   )
}

export default App
