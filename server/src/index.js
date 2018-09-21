import '@babel/polyfill/noConflict'
require('dotenv').config()
import http from 'http'
import app from './app'

const server = http.Server(app)
export const port = process.env.PORT || 3000
server.listen(port, (conn, err) => {
	process.stdout.write(`Running on http://localhost:${port} \n`)
})
