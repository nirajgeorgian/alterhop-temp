'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.login = exports.signup = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _response = require('../util/response.response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signup = exports.signup = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var data, user;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						data = req.body;
						user = new _user2.default(data);

						user.hashPassword();
						_context.next = 5;
						return user.save();

					case 5:
						return _context.abrupt('return', res.status(201).send((0, _response2.default)(true, user)));

					case 6:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function signup(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var login = exports.login = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
		var data, user, verified, token;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						data = req.body;
						_context2.next = 3;
						return _user2.default.findOne({ username: data.username });

					case 3:
						user = _context2.sent;

						if (user) {
							_context2.next = 8;
							break;
						}

						_context2.next = 7;
						return res.send((0, _response2.default)(false, 'No User exist\'s for ' + data.username));

					case 7:
						return _context2.abrupt('return', _context2.sent);

					case 8:
						verified = user.verifyPassword(data.password);

						console.log(verified);

						if (verified) {
							_context2.next = 12;
							break;
						}

						return _context2.abrupt('return', res.send((0, _response2.default)(false, 'Sorry the password did not matched:=> ' + data.password)));

					case 12:
						token = _jsonwebtoken2.default.sign({
							id: user.id,
							email: user.email,
							username: user.username
						}, process.env.JWT_SECRET, { expiresIn: '1h' });
						return _context2.abrupt('return', res.status(200).send((0, _response2.default)(true, token)));

					case 14:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function login(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();
//# sourceMappingURL=auth.controller.js.map