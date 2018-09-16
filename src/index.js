import '@babel/polyfill'
import app from './app'

export const port = process.env.PORT || 3000
app.listen(port, (conn, err) => {
	process.stdout.write(`Running on http://localhost:${port} \n`)
})
