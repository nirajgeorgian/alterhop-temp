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
		process.stderr.write(`Caught PORT conflict exception: ${err}\n`)
		process.stderr.write(`Please choose another port or switch off the :${port} port\n`)
		process.exit(1)
	} else {
		process.stderr.write(`Caught exception: ${err.message}\n`)
		process.exit()
	}
})
process.on('exit', code => {
	switch(code) {
		case 1:
			process.stderr.write(`About to exit with code: ${code} => Server Connection Error\n`)
			return process.exit(0)
		case 2:
			process.stderr.write(`About to exit with code: ${code} => Database Connection Error\n`)
			return process.exit(0)
		default:
			process.stderr.write(`About to exit with code: ${code} => Unhandled Error\n`)
			return process.exit(0)
	}
})
