import UserModel from '../models/user.model'
import success from '../util/success.response'

export const signup = async (req, res) => {
	const user = new User(res.body)
	await user.save()
	return success(true, user)
}

export const login = async (req, res) => {
	const data = req.body
}
