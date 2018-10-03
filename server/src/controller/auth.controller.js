import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model'
import response from '../util/response.response'

export const signup = async (req, res) => {
	const data = req.body
	const user = new UserModel(data)
	user.hashPassword()
	await user.save()
	return res.status(201).send(response(true, user))
}

export const login = async (req, res) => {
	const data = req.body
	const user = await UserModel.findOne({ username: data.username })
	if(!user) {
		return await res.send(response(false, `No User exist's for ${data.username}`))
	}
	const verified = user.verifyPassword(data.password)
	if(!verified) {
		return res.send(response(false, `Sorry the password did not matched:=> ${data.password}`))
	}
	const token = jwt.sign({
		id: user.id,
		email: user.email,
		username: user.username
	}, process.env.JWT_SECRET, { expiresIn: '1h' })
	return res.status(200).send(response(true, token))
}
