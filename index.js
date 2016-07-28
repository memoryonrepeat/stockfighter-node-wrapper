// TODO: Try using Promise (bluebird) or ES6 later
var request = require('request');

var wrapper = function (options) {

	var options = options || {};

	if (!options.apiKey){
		throw 'API key is missing';
	}

	var baseUrl = 'https://api.stockfighter.io/ob/api/';
	var client = request.default({
		baseUrl: baseUrl
	});

	return {

	};
};

module.exports = wrapper;