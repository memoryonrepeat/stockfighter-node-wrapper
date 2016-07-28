// TODO: Try using Promise (bluebird) or ES6 later
var request = require('request');

var wrapper = function (options) {

	var options = options || {};

	if (!options.apiKey){
		throw 'API key is missing';
	}

	var baseUrl = 'https://api.stockfighter.io/ob/api/';

	var client = request.defaults({
		baseUrl: baseUrl,
		headers: {
			'X-Starfighter-Authorization': options.apiKey
		},
		json: true
	});

	return {
		heartbeat: function(callback){
			client.get('/heartbeat', function(err, res, body){
				if (err){
					return callback(err, null);
				}
				return callback(null, body);
			});
		}
	};
};

module.exports = wrapper;