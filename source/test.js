
var assert = require( "assert" );

var Calculator = ( fn => new  fn() )( require('./calculator.js').default );

describe('Calculator Tests', function() {

    
    it('returns 1 + 1 = 2', function(done) {
	assert.equal(Calculator.sum(1, 1), 2);
	done();
    });

    it('returns 2 - 2 = 0', function(done) {
	assert.equal(Calculator.subtract(2, 2), 0);
	done();
    });

    it('returns 2 * 2 = 4', function(done) {
	assert.equal(Calculator.multiply(2, 2), 4);
	done();
    });

    it('returns 2 / 2 = 1', function(done) {
	assert.equal(Calculator.divide(2, 2), 1);
	done();
    });

    it('returns ( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1 ) / 2 = 0', function(done) {
	assert.equal(Calculator.calculate('( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1 ) / 2'), 0);
	done();
    });

    it('returns ( 2 / 2 ) + 2 - 2 * 2 / 2 = 1', function(done) {
	assert.equal(Calculator.calculate('( 2 / 2 ) + 2 - 2 * 2 / 2'), 1);
	done();
    });

    it('returns calculate 2 / 2 = 1', function(done) {
	assert.equal(Calculator.calculate(' 2 / 2 '), 1);
	done();
    });
    
    it('returns calculate 2.4 / 2 = 1.2', function(done) {
	assert.equal(Calculator.calculate(' 2.4 / 2 '), 1.2);
	done();
    });
    
    it('returns error ( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1  / 2 = 0', function(done) {
	assert.equal(Calculator.calculate('( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1 / 2'), null );
	done();
    });

});
