var expect = require('chai').expect; // Use expect to adopt BDD style
var wrapper = require('../index.js');
var apiKey = '7c57e4645e08460f21f19a511d6f195e5f1a7a30';
var client = null;
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
			expect(function(){
				client = wrapper({});
			}).to.throw('API key is missing');
		});

		it('should pass when API key is provided', function(){
			expect(function(){
				client = wrapper({
					apiKey: apiKey
				});
			}).to.not.throw(Error);
		});
	});
	
	describe('#heartbeat', function(){
		it('should successfully return system heartbeat', function(done){
			client.heartbeat(function(err,res){
				expect(err).to.be.equal(null);
				expect(res).to.have.ownProperty('ok');
				expect(res).to.have.ownProperty('error');
				done();
			});
		});
	});
});
