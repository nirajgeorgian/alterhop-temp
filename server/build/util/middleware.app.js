'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectMiddleware = undefined;

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _authverify = require('./authverify.middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Raven = require('raven');
Raven.config('https://918abef9f4ef486f97c14ff6176058a8@sentry.io/1282185').install();

var connectMiddleware = exports.connectMiddleware = function connectMiddleware(app) {
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
  app.use(_bodyParser2.default.json());
  app.use((0, _compression2.default)());
  app.use((0, _morgan2.default)('combined'));
  app.use(_authverify.verify);
};
//# sourceMappingURL=middleware.app.js.map