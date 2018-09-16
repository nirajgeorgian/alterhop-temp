'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.login = exports.signup = undefined;

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _success = require('../util/success.response');

var _success2 = _interopRequireDefault(_success);

var _string = require('../util/string.hash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signup = exports.signup = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var data, user;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						data = res.body;

						data.password = (0, _string.hashPassword)(data.password);
						user = new User(data);
						_context.next = 5;
						return user.save();

					case 5:
						return _context.abrupt('return', (0, _success2.default)(true, user));

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
		var data;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						data = req.body;

					case 1:
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