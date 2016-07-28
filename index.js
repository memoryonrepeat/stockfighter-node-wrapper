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
		},
		venue: {
			heartbeat: function(venue, callback){
				if (typeof venue === 'function'){
					callback = venue;
					venue = null;
				}
				if (!venue){
					if (typeof callback === 'function'){
						return callback('Venue not found', null);
					}
				}
				client.get('/venues/'+venue+'/heartbeat', function(err, res, body){
					if (err){
						return callback(err, null);
					}
					return callback(null, body);
				});
			},
			stocks: function(venue, callback){
				// TODO: Catch parameter exceptions
				client.get('/venues/'+venue+'/stocks', function(err, res, body){
					if (err){
						return callback(err, null);
					}
					return callback(null, body);
				});	
			}
		},
		stock: {
			orderbook: function(venue, stock, callback){
				// TODO: Catch parameter exceptions
				// NOTE: This function is not reliable for real time trading.
				// Refer to core API for more explanation.
				client.get('/venues/'+venue+'/stocks/'+stock, function(err, res, body){
					if (err){
						return callback(err, null);
					}
					return callback(null, body);
				});
			}
		}
	};
};

module.exports = wrapper;