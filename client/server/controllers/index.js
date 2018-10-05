import path from 'path'
import express from 'express'
import serverRenderer from '../middleware/renderer'
import getStore from '../../src/store/app.store'

const router = express.Router()


const actionIndex = (req, res, next) => {
  const store = getStore()
  serverRenderer(store)(req, res, next)
}


// root (/) should always serve our server rendered page
router.use('/*', actionIndex)

// other static resources should just be served as they are
router.use(express.static(
  path.resolve(__dirname, '..', '..', 'build'),
  { maxAge: '30d' },
));

export default router
