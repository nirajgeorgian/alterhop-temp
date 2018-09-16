'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashToken = exports.hashPassword = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashPassword = exports.hashPassword = function hashPassword(password) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 64;

  var key = _crypto2.default.pbkdf2Sync(password, process.env.HASH_SECRET, 100000, length, 'sha512');
  return key.toString('hex');
};

var hashToken = exports.hashToken = function hashToken() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

  var buf = _crypto2.default.randomBytes(size);
  return buf.toString('hex');
};
//# sourceMappingURL=string.hash.js.map