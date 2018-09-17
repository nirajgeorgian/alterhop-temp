import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import { verify } from './authverify.middleware'
var Raven = require('raven')
Raven.config('https://918abef9f4ef486f97c14ff6176058a8@sentry.io/1282185').install()

export const connectMiddleware = app => {
  // The request handler must be the first middleware on the app
  app.use(Raven.requestHandler());
  // The error handler must be before any other error middleware
  app.use(Raven.errorHandler());
  app.use(function onError(err, req, res, next) {
      // The error id is attached to `res.sentry` to be returned
      // and optionally displayed to the user for support.
      res.statusCode = 500;
      res.end(res.sentry + '\n');
  });
  app.use(bodyParser.json())
  app.use(compression())
  app.use(morgan('combined'))
  app.use(verify)
}
