'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dbDisconnect = exports.resolveAll = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

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

var resolveAll = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return mongoConnect;

					case 2:
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
exports.dbDisconnect = dbDisconnect;
//# sourceMappingURL=dbconn.js.map