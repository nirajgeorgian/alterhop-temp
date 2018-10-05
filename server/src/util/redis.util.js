const {promisify} = require('util')
import { redisClient } from '../dbconn'

const getAsync = promisify(redisClient.get).bind(redisClient)

export {
	getAsync
}
