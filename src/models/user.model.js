const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: String,
	username: String,
	email: String,
	password: String
})

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
