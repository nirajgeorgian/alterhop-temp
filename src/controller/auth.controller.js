import UserModel from '../models/user.model'
import success from '../util/success.response'
import { hashPassword } from '../util/string.hash'

export const signup = async (req, res) => {
	const data = res.body
	data.password = hashPassword(data.password)
	const user = new User(data)
	await user.save()
	return success(true, user)
}

export const login = async (req, res) => {
	const data = req.body
}
