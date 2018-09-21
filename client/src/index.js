import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { Provider as ReduxProvider } from 'react-redux'
import App from './App'
import getStore from './store/app.store'
// import registerServiceWorker from './registerServiceWorker';


const AppBundle = (
  <ReduxProvider store={getStore()}>
    <App />
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
