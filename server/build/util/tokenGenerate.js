'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.generateToken = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateToken = exports.generateToken = function generateToken(size) {
	var buf = _crypto2.default.randomBytes(size);
	var token = buf.toString('hex');
	return token;
};
//# sourceMappingURL=tokenGenerate.js.map