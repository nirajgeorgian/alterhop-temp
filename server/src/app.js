import express from 'express'
import { connectMiddleware } from './util/middleware.app'
// import './util/manageProcess.app' /* for managing process efficiently w.r.t exit code */
import { resolveAll } from './dbconn'
const app = express()
const router = express.Router()

/*
resolve db connection first to create a secure conection
 */
resolveAll()

/* Connect middleware here */
connectMiddleware(app)

/*
	Routes defined here
*/
import AuthRoute from './routes/auth.route'
import TestRoute from './routes/test.route'

/*
	Middleware for Routes connection defined here
*/
router.use('/auth', AuthRoute)
router.use('/', TestRoute)

app.use('/api', router)
export default app
