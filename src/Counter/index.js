import { injectReducer } from '../store/reducers'
import CounterContainer from './CounterContainer'
import counterReducer from './CounterReducers'

export default (store) => {
  
  /*  Add the reducer to the store on key 'counter'  */
  injectReducer(store, { key: 'counter', reducer: counterReducer })

  // return container as main module for route definition
  return CounterContainer
}
