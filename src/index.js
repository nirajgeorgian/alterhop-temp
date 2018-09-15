import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
const port = process.env.PORT || 3000

/*
	Routes defined here
*/
import AuthRoute from './routes/auth.route'
import TestRoute from './routes/test.route'

app.use('/auth', AuthRoute)
app.use('/', TestRoute)

app.listen(port, () => {
	console.log(`Running on http://localhost:${port}`)
})
