import { combineReducers } from 'redux'
import { weatherReducer } from './weatherReducer'

export const reducers = combineReducers({
   weather: weatherReducer,
})
