'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.revoke = undefined;

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isRevokedCallback = function isRevokedCallback(req, payload, done) {
  var issuer = payload.iss;
  var tokenId = payload.jti;

  data.getRevokedToken(issuer, tokenId, function (err, token) {
    if (err) {
      return done(err);
    }
    return done(null, !!token);
  });
};

var revoke = exports.revoke = function revoke(req, res, next) {
  return (0, _expressJwt2.default)({
    secret: 'dodoN9@#*%()',
    isRevoked: isRevokedCallback
  });
};

var verify = exports.verify = (0, _expressJwt2.default)({
  secret: 'dodoN9@#*%()',
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
});
//# sourceMappingURL=authverify.middleware.js.map