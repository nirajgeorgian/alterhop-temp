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
UserSchema.statics.hashPassword = function(length = 64) {
	const key = crypto.pbkdf2Sync(this.password, process.env.HASH_SECRET, 100000, length, 'sha512')
	this.password = key.toString('hex')
	return true
}

UserSchema.statics.verifyPassword = function(password, length = 64) {
	const key = crypto.pbkdf2Sync(password, process.env.HASH_SECRET, 100000, length, 'sha512')
	if(this.password === key) {
		return true
	}
	return false
}


const UserModel = mongoose.model('user', UserSchema)

export default UserModel
