import jwt from 'jsonwebtoken'
import redis from 'redis'
import UserModel from '../models/user.model'
import response from '../util/response.response'
import { redisClient } from '../dbconn'
import { generateToken } from '../util/tokenGenerate'
import { getAsync } from '../util/redis.util'

export const signup = async (req, res) => {
	const data = req.body
	const oldUser = await UserModel.findOne({ $or: [{email: data.email}, { username: data.username}]})
	if(oldUser) {
		return res.status(401).send(response(false, "error user already exists"))
	}
	const user = new UserModel(data)
	user.hashPassword()
	await user.save()
	return res.status(201).send(response(true, user))
}

export const login = async (req, res) => {
	const data = req.body
	const user = await UserModel.findOne({ username: data.username })
	if(!user) {
		return await res.status(401).send(response(false, `No User exist's`))
	}
	const verified = user.verifyPassword(data.password)
	if(!verified) {
		return res.status(401).send(response(false, `Sorry the password did not matched.`))
	}
	const token = jwt.sign({
		id: user.id,
		email: user.email,
		username: user.username
	}, process.env.JWT_SECRET, { expiresIn: '1h' })
	return res.status(200).send(response(true, token))
}

export const passwordToken = async (req, res) => {
	const data = req.body
	const email = data.email ? data.email : ''
	const username = data.username ? data.username : ''
	const user = await UserModel.findOne({ $or: [{ email: email }, { username: username }]})
	if(!user) {
		if(email === '' && username === '') {
			return res.status(401).send(response(false, `Please pass email or username`))
		}
		if(email !== '') {
			return res.status(401).send(response(false, `no user exist for this ${email}`))
		}
		if(username !== '') {
			return res.status(401).send(response(false, `no user exist for this ${username}`))
		}
	}
	const token = generateToken(50)
	if(email !== '') {
		redisClient.set(`${email}-password-reset`, token, redis.print)
	}
	if(username !== '') {
		redisClient.set(`${username}-password-reset`, token, redis.print)
	}
	return res.status(200).send(response(true, token))
}


/**
 * @params { token, username, email }
 * @return { success, message }
 * Mutation to confirm password reset token and generate token for updating password
 */
const confirmToken = async (_, { input }, { redisClient, getAsync }) => {
	const data = req.body
	const token = data.token
	const email = data.email ? data.email : ''
	const username = data.username ? data.username : ''
	let key = null
	if(email !== '') {
		key = `${email}-password-reset`
	}
	if(username !== '') {
		key = `${username}-password-reset`
	}
	if(key !== null) {
		const isKey = redisClient.get(key, redis.print)
		if(!isKey) {
			return res.status(401).send(response(false, `no value for provider key`))
		}
	}
	const user = await User.findOne({$or: [{ email: email }, { username: username }]})
	if(!user) {
		if(email === '' && username === '') {
			return res.status(401).send(response(false, `Please pass email or username`))
		}
		if(email !== '') {
			return res.status(401).send(response(false, `no user exist for this ${email}`))
		}
		if(username !== '') {
			return res.status(401).send(response(false, `no user exist for this ${username}`))
		}
	}
	const datat = await getAsync(key)
	if(datat !== token || datat === null) {
		return res.status(401).send(response(false, `Please pass valid token`))
	}
	// data is equal to token
	redisClient.del(key)
	const newToken = generateToken(50)
	if(email !== '') {
		redisClient.set(`${email}-password-token`, newToken, redis.print)
	}
	if(username !== '') {
		redisClient.set(`${username}-password-token`, newToken, redis.print)
	}
	return res.status(200).send(response(true, newToken))
}


/**
 * @params { token, againPassword, password }
 * @return { success, message }
 * Mutation to confirm reset password with token
 */
const resetPassword = async (_, { input }, { redisClient, getAsync }) => {
	const data = req.body
	const token = data.token
	const email = data.email ? data.email : ''
	const username = data.username ? data.username : ''
	let key = null
	if(email !== '') {
		key = `${email}-password-token`
	}
	if(username !== '') {
		key = `${username}-password-token`
	}
	const user = await User.findOne({$or: [{ email: email }, { username: username }]})
	if(!user) {
		if(email === '' && username === '') {
			return res.status(401).send(response(false, `Please pass email or username`))
		}
		if(email !== '') {
			return res.status(401).send(response(false, `no user exist for this ${email}`))
		}
		if(username !== '') {
			return res.status(401).send(response(false, `no user exist for this ${username}`))
		}
	}
	const datat = await getAsync(key)
	if(datat !== token || datat === null) {
		return res.status(401).send(response(false, `Please pass valid token`))
	}
	if(data.password !== data.againPassword) {
		return res.status(401).send(response(false, `Wrong password match`))
	}
	user.password = data.password
	user.hashPassword()
	await user.save()
	redisClient.del(key)
	return res.status(200).send(response(true, "Successfully updated password"))
}
