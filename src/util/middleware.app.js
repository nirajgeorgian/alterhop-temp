import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import { verify } from './authverify.middleware'

export const connectMiddleware = app => {
  app.use(bodyParser.json())
  app.use(compression())
  app.use(morgan('combined'))
  app.use(verify)
}
