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

var _tokenGenerate = require('../util/tokenGenerate');

var _redis = require('../util/redis.util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signup = exports.signup = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var data, oldUser, user;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						data = req.body;
						_context.next = 3;
						return _user2.default.findOne({ $or: [{ email: data.email }, { username: data.username }] });

					case 3:
						oldUser = _context.sent;

						if (!oldUser) {
							_context.next = 6;
							break;
						}

						return _context.abrupt('return', res.status(401).send((0, _response2.default)(false, "error user already exists")));

					case 6:
						user = new _user2.default(data);

						user.hashPassword();
						_context.next = 10;
						return user.save();

					case 10:
						return _context.abrupt('return', res.status(201).send((0, _response2.default)(true, user)));

					case 11:
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
						return res.status(401).send((0, _response2.default)(false, 'No User exist\'s for ' + data.username));

					case 7:
						return _context2.abrupt('return', _context2.sent);

					case 8:
						verified = user.verifyPassword(data.password);

						if (verified) {
							_context2.next = 11;
							break;
						}

						return _context2.abrupt('return', res.status(401).send((0, _response2.default)(false, 'Sorry the password did not matched:=> ' + data.password)));

					case 11:
						token = _jsonwebtoken2.default.sign({
							id: user.id,
							email: user.email,
							username: user.username
						}, process.env.JWT_SECRET, { expiresIn: '1h' });
						return _context2.abrupt('return', res.status(200).send((0, _response2.default)(true, token)));

					case 13:
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

// const passwordToken = async (req, res) => {
// 	const data = req.body
// 	const email = data.email ? data.email : ''
// 	const username = data.username ? data.username : ''
// 	const user = await UserModel.findOne({ $or: [{ email: email }, { username: username }]})
// 	if(!user) {
// 		if(email === '' && username === '') {
// 			return res.status(401).send(response(false, `Please pass email or username`))
// 		}
// 		if(email !== '') {
// 			return res.status(401).send(response(false, `no user exist for this ${email}`))
// 		}
// 		if(username !== '') {
// 			return res.status(401).send(response(false, `no user exist for this ${username}`))
// 		}
// 	}
// 	const token = generateToken(50)
// 	if(email !== '') {
// 		redisClient.set(`${email}-password-reset`, token, redis.print)
// 	}
// 	if(username !== '') {
// 		redisClient.set(`${username}-password-reset`, token, redis.print)
// 	}
// 	return res.status(200).send(response(true, token))
// }
//
//
// /**
//  * @params { token, username, email }
//  * @return { success, message }
//  * Mutation to confirm password reset token and generate token for updating password
//  */
// const confirmToken = async (_, { input }, { redisClient, getAsync }) => {
// 	const data = req.body
// 	const token = data.token
// 	const email = data.email ? data.email : ''
// 	const username = data.username ? data.username : ''
// 	let key = null
// 	if(email !== '') {
// 		key = `${email}-password-reset`
// 	}
// 	if(username !== '') {
// 		key = `${username}-password-reset`
// 	}
// 	if(key !== null) {
// 		const isKey = redisClient.get(key, redis.print)
// 		if(!isKey) {
// 			return res.status(401).send(response(false, `no value for provider key`))
// 		}
// 	}
// 	const user = await User.findOne({$or: [{ email: email }, { username: username }]})
// 	if(!user) {
// 		if(email === '' && username === '') {
// 			return res.status(401).send(response(false, `Please pass email or username`))
// 		}
// 		if(email !== '') {
// 			return res.status(401).send(response(false, `no user exist for this ${email}`))
// 		}
// 		if(username !== '') {
// 			return res.status(401).send(response(false, `no user exist for this ${username}`))
// 		}
// 	}
// 	const datat = await getAsync(key)
// 	if(datat !== token || datat === null) {
// 		return res.status(401).send(response(false, `Please pass valid token`))
// 	}
// 	// data is equal to token
// 	redisClient.del(key)
// 	const newToken = generateToken(50)
// 	if(email !== '') {
// 		redisClient.set(`${email}-password-token`, newToken, redis.print)
// 	}
// 	if(username !== '') {
// 		redisClient.set(`${username}-password-token`, newToken, redis.print)
// 	}
// 	return res.status(200).send(response(true, newToken))
// }
//
//
// /**
//  * @params { token, againPassword, password }
//  * @return { success, message }
//  * Mutation to confirm reset password with token
//  */
// const resetPassword = async (_, { input }, { redisClient, getAsync }) => {
// 	const data = req.body
// 	const token = data.token
// 	const email = data.email ? data.email : ''
// 	const username = data.username ? data.username : ''
// 	let key = null
// 	if(email !== '') {
// 		key = `${email}-password-token`
// 	}
// 	if(username !== '') {
// 		key = `${username}-password-token`
// 	}
// 	const user = await User.findOne({$or: [{ email: email }, { username: username }]})
// 	if(!user) {
// 		if(email === '' && username === '') {
// 			return res.status(401).send(response(false, `Please pass email or username`))
// 		}
// 		if(email !== '') {
// 			return res.status(401).send(response(false, `no user exist for this ${email}`))
// 		}
// 		if(username !== '') {
// 			return res.status(401).send(response(false, `no user exist for this ${username}`))
// 		}
// 	}
// 	const datat = await getAsync(key)
// 	if(datat !== token || datat === null) {
// 		return res.status(401).send(response(false, `Please pass valid token`))
// 	}
// 	if(data.password !== data.againPassword) {
// 		return res.status(401).send(response(false, `Wrong password match`))
// 	}
// 	user.password = data.password
// 	user.hashPassword()
// 	await user.save()
// 	redisClient.del(key)
// 	return res.status(200).send(response(true, "Successfully updated password"))
// }
//# sourceMappingURL=auth.controller.js.map