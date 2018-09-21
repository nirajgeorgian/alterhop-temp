'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var response = function response() {
	var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { data: 'sorry no data available' };

	return {
		success: success,
		data: data
	};
};

exports.default = response;
//# sourceMappingURL=response.response.js.map