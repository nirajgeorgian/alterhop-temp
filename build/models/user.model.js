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

var UserModel = mongoose.model('user', UserSchema);

exports.default = UserModel;
//# sourceMappingURL=user.model.js.map