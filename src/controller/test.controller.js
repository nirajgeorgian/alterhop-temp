import success from '../util/success.response'

export const get = (req, res) => {
  res.send(success(true, "Welcome to the api"))
}

export const post = (req, res) => {
  res.send(success(true, req.body))
}
