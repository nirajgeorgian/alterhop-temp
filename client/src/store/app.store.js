/*
  create the global store
 */
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpics } from '../epics/root.epic'
// import { composeEnhancers } from 'redux-devtools-extension'

/*
  import your root reducer here
 */
import { userReducer } from '../reducers/user.reducer'

/*
  make changes to create store with proper middleware
 */
const composeEnhancers = process.env.NODE_ENV === 'development' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose
const epicMiddleware = createEpicMiddleware()
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(epicMiddleware))(createStore)

const rootReducer = combineReducers({
  userReducer
})

export const configureStore = (initialState = {}) => {
  return createStoreWithMiddleware(rootReducer, initialState)
}

const getStore = () => {
  const store = configureStore( window.__REDUX_STATE__ || {} )
  epicMiddleware.run(rootEpics)
  return store
}
export default getStore
