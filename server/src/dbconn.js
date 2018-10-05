require('dotenv').config()
import mongoose from 'mongoose'

/*
	@mongodb connection
	Database connection for nosql database
*/
const mongoUrl = `${process.env.MONGO_URL}/${process.env.MONGO_DB}`
mongoose.set('bufferCommands', false)
const mongooseConnect = mongoose.connect(mongoUrl, { autoReconnect: true, useNewUrlParser: true, connectTimeoutMS: 1000 })
const mongodb = mongoose.connection
const mongoConnect = new Promise((resolve, reject) => {
	mongodb.once('open', () => {
		process.stdout.write(`🚀 Connected to ${mongoUrl} nosql mongo database \n`)
		resolve(mongodb)
	})
	mongodb.on('error', (error) => {
		process.stderr.write('Error occured during database connection \n')
		process.stderr.write(`${error} \n`)
		reject(new Error("Error connection to mongodb"))
	})
})

/* mongoose disconnect connection used for testing */
const dbDisconnect = done => {
	mongoose.disconnect(done)
}

/*
	@redis connection
	create a redis client and connection is established
*/
const redisClient = redis.createClient(`${process.env.REDIS_SERVER_PORT}`, `${process.env.REDIS_HOST}`)
const redisConnect = new Promise((resolve, reject) => {
	redisClient.on('error', err => {
		// redis error
		process.stderr.write(`Error occured ${err.message()}`)
		reject(err.message())
		process.exit()
	})
	redisClient.on('connect', () => {
		process.stdout.write(`🚀 Connected to redis redis:6379`)
		resolve(redisClient)
	})
})

const resolveAll = async () => {
	await mongoConnect
	await redisConnect
}

export {
	resolveAll,
	redisConnect,
	dbDisconnect
}
