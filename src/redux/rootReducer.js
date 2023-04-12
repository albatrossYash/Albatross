import { combineReducers } from 'redux'
import transactionReducer from './Products/reducer'
const rootReducers = combineReducers({
    transactionReducer,
})
export default rootReducers;