'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getAsync = undefined;

var _dbconn = require('../dbconn');

var _require = require('util'),
    promisify = _require.promisify;

var getAsync = promisify(_dbconn.redisClient.get).bind(_dbconn.redisClient);

exports.getAsync = getAsync;
//# sourceMappingURL=redis.util.js.map