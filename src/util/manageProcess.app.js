import { port } from '../index'
/*
	Nodejs process handling as per the status code
	0 => Process exit
	11 => Database Connection
	22 => Server Connection
*/
/* Uncaught Error handling */
process.on('uncaughtException', err => {
	if(err.code === 'EADDRINUSE') {
		console.log(`Caught PORT conflict exception: ${err}\n`)
		console.log(`Please choose another port or switch off the :${port} port`)
		process.exit(1)
	} else {
		console.log(`Caught exception: ${err.message}\n`)
		process.exit()
	}
})
process.on('exit', code => {
	switch(code) {
		case 1:
			console.log(`About to exit with code: ${code} => Server Connection Error`)
			return process.exit(0)
		case 2:
			console.log(`About to exit with code: ${code} => Database Connection Error`)
			return process.exit(0)
		default:
			console.log(`About to exit with code: ${code} => Unhandled Error`)
			return process.exit(0)
	}
})
