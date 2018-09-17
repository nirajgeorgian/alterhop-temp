const crypto = require('crypto')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: String,
	username: String,
	email: String,
	password: String
})

/*
	Method's to encrypt and decrypt the password
	@params {password}
	@return {hashed password}
*/
UserSchema.methods.hashPassword = function(length = 64) {
	const salt = new Buffer(new String(process.env.HASH_SECRET), 'base64')
	const hashPassword = new Buffer(new String(this.password), 'base64')
	const key = crypto.pbkdf2Sync(hashPassword, salt, 100000, length, 'sha512')
	this.password = key.toString('hex')
	return true
}

UserSchema.methods.verifyPassword = function(password, length = 64) {
	const salt = new Buffer(new String(process.env.HASH_SECRET), 'base64')
	const hashPassword = new Buffer(new String(password), 'base64')
	const key = crypto.pbkdf2Sync(password, salt, 100000, length, 'sha512')
	if(this.password === key.toString('hex')) {
		return true
	}
	return false
}


const UserModel = mongoose.model('user', UserSchema)

export default UserModel
