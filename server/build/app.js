'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _middleware = require('./util/middleware.app');

require('./util/manageProcess.app');

var _dbconn = require('./dbconn');

var _auth = require('./routes/auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _test = require('./routes/test.route');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); /* for managing process efficiently w.r.t exit code */

var router = _express2.default.Router();

/*
resolve db connection first to create a secure conection
 */
(0, _dbconn.resolveAll)();

/* Connect middleware here */
(0, _middleware.connectMiddleware)(app);

/*
	Routes defined here
*/


/*
	Middleware for Routes connection defined here
*/
router.use('/auth', _auth2.default);
router.use('/', _test2.default);

app.use('/api', router);
exports.default = app;
//# sourceMappingURL=app.js.map