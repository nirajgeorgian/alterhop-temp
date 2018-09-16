import exjwt from 'express-jwt'

var isRevokedCallback = function(req, payload, done) {
  var issuer = payload.iss
  var tokenId = payload.jti

  data.getRevokedToken(issuer, tokenId, function(err, token) {
    if (err) {
      return done(err)
    }
    return done(null, !!token)
  })
}

export const revoke = (req, res, next) => {
  exjwt({
    secret: 'Random@!@#45',
    isRevoked: isRevokedCallback
  })
}

export const verify = (req, res, next) => {
  exjwt({
    secret: 'Random@!@#45',
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1]
      }
      else if(req.query && req.query.token) {
        return req.query.token
      }
      return null
    }
  })
}
