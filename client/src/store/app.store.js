/*
  create the global store
 */
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import localforage from "localforage" // defaults to localStorage for web
import { rootEpics } from '../epics/app.epic'
// import { composeEnhancers } from 'redux-devtools-extension'

/*
  import your root reducer here
 */
import { userReducer } from '../reducers/user.reducer'

localforage.config({
    driver: localforage.supports(localforage.LOCALSTORAGE) ? localforage.LOCALSTORAGE : localforage.INDEXEDDB,
    name: 'alterhoop-localforage'
})
localforage.ready().then(function() {
    // This code runs once localforage
    // has fully initialized the selected driver.
    console.log(localforage.driver()); // LocalStorage
}).catch(function (e) {
    console.log(e); // `No available storage method found.`
    // One of the cases that `ready()` rejects,
    // is when no usable storage driver is found
})
const persistConfig = {
  key: 'root',
  storage: localforage,
  whitelist: ['userReducer']
}
/*
  make changes to create store with proper middleware
 */
const composeEnhancers = process.env.NODE_ENV === 'development' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose
const epicMiddleware = createEpicMiddleware()
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(logger, epicMiddleware))(createStore)

const rootReducer = combineReducers({
  userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = (initialState = {}) => {
  return createStoreWithMiddleware(persistedReducer, initialState)
}

const getStore = () => {
  const store = configureStore( window.__REDUX_STATE__ || {} )
  epicMiddleware.run(rootEpics)
  return store
}
let persistor = persistStore(getStore())

export {
	persistor
}
export default getStore
