require('dotenv').config()
import mongoose from 'mongoose'

/*
	@mongodb connection
	Database connection for nosql database
*/
const mongoUrl = `${process.env.MONGO_URL}/${process.env.MONGO_DB}`
mongoose.set('bufferCommands', false)
const mongooseConnect = mongoose.connect('mongodb://localhost:27017/slterhop', { autoReconnect: true, useNewUrlParser: true, connectTimeoutMS: 1000 })
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

const resolveAll = async () => {
	await mongoConnect
}

export {
	resolveAll,
	dbDisconnect
}
