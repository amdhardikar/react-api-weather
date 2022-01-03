import React from 'react'
import { createStore } from 'redux'
import './App.css'
import Searchbar from './component/Searchbar'
import Current from './component/Current'
import Hour from './component/Hour'
import Day from './component/Day'
import { reducers } from './reducers'
import { Provider } from 'react-redux'

const store = createStore(reducers)

const App = () => {
   return (
      <Provider store={store}>
         <div className="App">
            <Current />
            <div className="sub-container">
               <Searchbar />
               <Hour />
               <Day />
            </div>
         </div>
      </Provider>
   )
}

export default App
