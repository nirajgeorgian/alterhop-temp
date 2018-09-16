import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'

export const connectMiddleware = app => {
  app.use(bodyParser.json())
  app.use(compression())
  app.use(morgan('combined'))
}
