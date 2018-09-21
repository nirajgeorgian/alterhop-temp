import express from 'express'
import mongoose from 'mongoose'
import { connectMiddleware } from './util/middleware.app'
import './util/manageProcess.app' /* for managing process efficiently w.r.t exit code */
const app = express()
const router = express.Router()

/*
	mongodb connection URI
	mongodb://root:alterhopN9@ds227332.mlab.com:27332/alterhop
*/
export const dbConnect = () => {
	mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`,
	{ useNewUrlParser: true })
	.then(
		res => process.stdout.write(`successfully connected to mongodb database \n`),
		err => {
			process.stderr.write('Error occured during database connection \n')
			return process.exit(2)
		}
	)
}
process.nextTick(dbConnect)
/* mongoose disconnect connection used for testing */
export const dbDisconnect = done => {
	mongoose.disconnect(done)
}

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
