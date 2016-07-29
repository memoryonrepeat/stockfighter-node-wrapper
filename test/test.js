// TODO: Use mocha for proper testing
var assert = require('chai').assert;
var wrapper = require('../index.js');
var apiKey = '7c57e4645e08460f21f19a511d6f195e5f1a7a30';
/*
var failed_client = wrapper({}); // should throw exception
var client = wrapper({
	apiKey: apiKey
});
client.heartbeat(function(err,res){
	console.log('heartbeat',err, res);
});

client.venue.heartbeat('MTMEX',function(err,res){
	console.log('venue',err, res);
});

client.venue.stocks('MTMEX',function(err,res){
	console.log('venue',err, res);
});

client.stock.orderbook('MTMEX','ITF',function(err,res){
	console.log('venue',err, res);
});
*/
describe('API', function(){
	describe('#instantiation', function(){

		it('should fail when API key is not provided', function(){
			assert.throws(function(){
				var client = wrapper({});
			},'API key is missing');
		});

		it('should pass when API key is not provided', function(){
			assert.doesNotThrow(function(){
				var client = wrapper({
					apiKey: apiKey
				});
			});
		});
	});
	
	describe('#heartbeat', function(){

	});
});