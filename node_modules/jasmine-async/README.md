	
	Allows jasmine.async to be used in Node.js as an NPM module.


#Install: 

		npm install jasmine.async


#Usage: 

	var AsyncSpec = require('jasmine.async')(jasmine);

	describe('After one second', function() {
		var async =  new AsyncSpec(this);
		async.it('it should check that 1 equals 1.', function(done) {
			setTimeout(function() {
				expect(1).toEqual(1);
				done();
			}, 1000);
		});
	});

	Once included just run your Jasmine tests as you always did. 