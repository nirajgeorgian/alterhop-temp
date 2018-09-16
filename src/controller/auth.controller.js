import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model'
import response from '../util/response.response'

export const signup = async (req, res) => {
	const data = res.body
	const user = new User(data)
	user.hashPassword()
	await user.save()
	return response(true, user)
}

export const login = async (req, res) => {
	const data = req.body
	const user = UserModel.findOne({ username: data.username })
	if(!user) {
		return response(false, `No User exist's for ${user.username}`)
	}
	const verified = user.verifyPassword(data.password)
	if(!verified) {
		return response(false, `Sorry the password did not matched:=> ${data.password}`)
	}
	const token = jwt.sign({
		id: user.id,
		email: user.email,
		username: user.username
	}, 'Random@!@#45', { expiresIn: '1h' })
	return res.send(response(true, token))
}
