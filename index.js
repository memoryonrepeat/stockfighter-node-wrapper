// TODO: 
// Try using Promise (bluebird) or ES6
// Is this API developer friendly enough ?
// Better to prioritize REST verbs over entities ? 
// Read up on API design to figure out
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
					// Maybe include the case where res !== 200 also ?
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
			},
			quote: function(venue, stock, callback){
				client.get('/venues/'+venue+'/stocks/'+stock+'/quote', function(err, res, body){
					if (err){
						return callback(err, null);
					}
					return callback(null, body);
				});	
			}
		},
		order: {
			status: function(venue, stock, id, callback){
				client.get('/venues/'+venue+'/stocks/'+stock+'/orders/'+id, function(err, res, body){
					if (err){
						return callback(err, null);
					}
					return callback(null, body);
				});
			},
			delete: function(venue, stock, id, callback){
				client.delete('/venues/'+venue+'/stocks/'+stock+'/orders/'+id, function(err, res, body){
					if (err){
						return callback(err, null);
					}
					return callback(null, body);
				});
			},
			post: function(venue, stock, order, callback){
				var options = {
					url: '/venues/'+venue+'/stocks/'+stock+'/orders/',
					body: order
				}
				client.post(options, function(err, res, body){
					if (err){
						return callback(err, null);
					}
					return callback(null, body);
				});
			}
		},
		account: {
			orders: {
				all: function(venue, account, callback){
					client.get('/venues/'+venue+'/accounts/'+account+'/orders/', function(err, res, body){
						if (err){
							return callback(err, null);
						}
						return callback(null, body);
					});
				},
				stock: function(venue, account, stock, callback){
					client.get('/venues/'+venue+'/accounts/'+account+'/stocks/'+stock+'/orders', function(err, res, body){
						if (err){
							return callback(err, null);
						}
						return callback(null, body);
					});
				}
			}
		}
	};
};

module.exports = wrapper;