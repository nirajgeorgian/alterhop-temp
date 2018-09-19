"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = exports.get = undefined;

var _response = require("../util/response.response");

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = exports.get = function get(req, res) {
  res.send((0, _response2.default)(true, "Welcome to the api"));
};

var post = exports.post = function post(req, res) {
  res.send((0, _response2.default)(true, req.body));
};
//# sourceMappingURL=test.controller.js.map