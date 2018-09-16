'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.port = undefined;

require('@babel/polyfill');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _middleware = require('./util/middleware.app');

require('./util/manageProcess.app');

var _auth = require('./routes/auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _test = require('./routes/test.route');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* for managing process efficiently w.r.t exit code */
var app = (0, _express2.default)();

/*
	mongodb connection URI
	mongodb://root:alterhopN9@ds227332.mlab.com:27332/alterhop
*/
_mongoose2.default.connect('mongodb://root:alterhopN9@ds227332.mlab.com:27332/alterhop', { useNewUrlParser: true }).then(function (res) {
	return console.log('successfully connected to mongodb database');
}, function (err) {
	console.log("Error occured during database connection");
	return process.exit(2);
});

/* Connect middleware here */
(0, _middleware.connectMiddleware)(app);
var port = exports.port = process.env.PORT || 3000;

/*
	Routes defined here
*/


/*
	Middleware for Routes connection defined here
*/
app.use('/auth', _auth2.default);
app.use('/', _test2.default);

app.listen(port, function (conn, err) {
	console.log('Running on http://localhost:' + port);
});
//# sourceMappingURL=index.js.map