'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _auth = require('./routes/auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _test = require('./routes/test.route');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('combined'));
var port = process.env.PORT || 3000;

/*
	Routes defined here
*/


app.use('/auth', _auth2.default);
app.use('/', _test2.default);

app.listen(port, function () {
	console.log('Running on http://localhost:' + port);
});
//# sourceMappingURL=index.js.map