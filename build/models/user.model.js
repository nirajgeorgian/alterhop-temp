'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	username: String,
	email: String,
	password: String
});

/*
	Method's to encrypt and decrypt the password
	@params {password}
	@return {hashed password}
*/
UserSchema.statics.hashPassword = function () {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 64;

	var key = crypto.pbkdf2Sync(this.password, process.env.HASH_SECRET, 100000, length, 'sha512');
	this.password = key.toString('hex');
	return true;
};

UserSchema.statics.verifyPassword = function (password) {
	var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 64;

	var key = crypto.pbkdf2Sync(password, process.env.HASH_SECRET, 100000, length, 'sha512');
	if (this.password === key) {
		return true;
	}
	return false;
};

var UserModel = mongoose.model('user', UserSchema);

exports.default = UserModel;
//# sourceMappingURL=user.model.js.map