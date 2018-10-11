'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dbDisconnect = exports.redisConnect = exports.resolveAll = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();


/*
	@mongodb connection
	Database connection for nosql database
*/
var mongoUrl = process.env.MONGO_URL + '/' + process.env.MONGO_DB;
_mongoose2.default.set('bufferCommands', false);
var mongooseConnect = _mongoose2.default.connect(mongoUrl, { autoReconnect: true, useNewUrlParser: true, connectTimeoutMS: 1000 });
var mongodb = _mongoose2.default.connection;
var mongoConnect = new Promise(function (resolve, reject) {
	mongodb.once('open', function () {
		process.stdout.write('\uD83D\uDE80 Connected to ' + mongoUrl + ' nosql mongo database \n');
		resolve(mongodb);
	});
	mongodb.on('error', function (error) {
		process.stderr.write('Error occured during database connection \n');
		process.stderr.write(error + ' \n');
		reject(new Error("Error connection to mongodb"));
	});
});

/* mongoose disconnect connection used for testing */
var dbDisconnect = function dbDisconnect(done) {
	_mongoose2.default.disconnect(done);
};

/*
	@redis connection
	create a redis client and connection is established
*/
var redisClient = _redis2.default.createClient('' + process.env.REDIS_SERVER_PORT, 'localhost');
var redisConnect = new Promise(function (resolve, reject) {
	redisClient.on('error', function (err) {
		// redis error
		process.stderr.write('Error occured ' + err.message());
		reject(err.message());
		process.exit();
	});
	redisClient.on('connect', function () {
		process.stdout.write('\uD83D\uDE80 Connected to redis redis:6379');
		resolve(redisClient);
	});
});

var resolveAll = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return mongoConnect;

					case 2:
						_context.next = 4;
						return redisConnect;

					case 4:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function resolveAll() {
		return _ref.apply(this, arguments);
	};
}();

exports.resolveAll = resolveAll;
exports.redisConnect = redisConnect;
exports.dbDisconnect = dbDisconnect;
//# sourceMappingURL=dbconn.js.map