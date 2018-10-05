import express from 'express'
import path from 'path'
import Loadable from 'react-loadable'
import serverRenderer from './middleware/renderer'
import getStore from '../src/store/app.store'

const PORT = 5000

// initialize the application and create the routes
const app = express()
app.use(express.static(
  path.resolve(__dirname,'..', 'build'),
  { maxAge: '30d' },
))

app.get('*', (req, res, next) => {
  const store = getStore()
  serverRenderer(store)(req, res, next)
})

// start the app
Loadable.preloadAll().then(() => {
    app.listen(PORT, (error) => {
        if (error) {
            return console.log('something bad happened', error);
        }
        console.log("listening on " + PORT + "...")
    })
})
