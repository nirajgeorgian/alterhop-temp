import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { persistor } from './store/app.store'
import getStore from './store/app.store'
import AppRouter from './router/app.routes'
// import registerServiceWorker from './registerServiceWorker';


const AppBundle = (
  <ReduxProvider store={getStore()}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <AppRouter />
      </Router>
    </PersistGate>
  </ReduxProvider>
);

window.onload = () => {
  const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate
  Loadable.preloadReady().then(() => {
    renderMethod(
      AppBundle,
      document.getElementById('root')
    )
  })
};

// registerServiceWorker();
