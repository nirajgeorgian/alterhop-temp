'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../controller/auth.controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.route('/signup').post(_auth.signup);

router.route('/login').post(_auth.login);

exports.default = router;
//# sourceMappingURL=auth.route.js.map