'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.port = undefined;

require('@babel/polyfill/noConflict');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
var port = exports.port = process.env.PORT || 3000;
_app2.default.listen(port, function (conn, err) {
	process.stdout.write('Running on http://localhost:' + port + ' \n');
});
//# sourceMappingURL=index.js.map