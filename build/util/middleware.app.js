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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectMiddleware = exports.connectMiddleware = function connectMiddleware(app) {
  app.use(_bodyParser2.default.json());
  app.use((0, _compression2.default)());
  app.use((0, _morgan2.default)('combined'));
};
//# sourceMappingURL=middleware.app.js.map