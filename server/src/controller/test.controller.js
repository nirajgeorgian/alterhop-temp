import response from '../util/response.response'

export const get = (req, res) => {
  res.send(response(true, "Welcome to the api"))
}

export const post = (req, res) => {
  res.send(response(true, req.body))
}
