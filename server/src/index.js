require('dotenv').config()
import '@babel/polyfill/noConflict'
import http from 'http'
import app from './app'

const server = http.createServer(app)
export const port = process.env.PORT || 3000
server.listen(port, (conn, err) => {
	process.stdout.write(`Running on http://localhost:${port} \n`)
})
