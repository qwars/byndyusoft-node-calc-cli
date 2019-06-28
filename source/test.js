
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

    it('returns calculation ( ( ( ( 2 / 2 ) + 2 - 2 * 2 / 3 * 5 ) + 1  / 2 ) * 0', function(done) {
	assert.equal( Calculator.calculation('( ( ( ( 2 / 2 ) + 2 -  2 * 2 / 3 * 5 ) + 1  / 2 ) * 0'), 0 );
	done();
    });

    it('returns calculation ( ( 2 / 2 ) + 2 - 5 * 1 ) = -2', function(done) {
	assert.equal( Calculator.calculation('( ( 2 / 2 ) + 2 - 5 * 1 )'), -2 );
	done();
    });
    
    it('returns calculation ( ( 2 / 2 ) + 2 - 5 * 10 ) = -47', function(done) {
	assert.equal( Calculator.calculation('( ( 2 / 2 ) + 2 - 5 * 10 )'), -47 );
	done();
    });

    it('returns calculation ( ( 2 / 2 ) + 2 + 5 * 10 ) = 53', function(done) {
	assert.equal( Calculator.calculation('( ( 2 / 2 ) + 2 + 5 * 10 )'), 53 );
	done();
    });

    it('returns syntax error ( ( 2 / 2 ) + 2 + 5 * 10', function(done) {
	assert.ok( !Calculator.syntax('( ( 2 / 2 ) + 2 + 5 * 10') );
	done();
    });

    it('returns syntax error ( ( 2 / 2 ) + 2 + 5 ** 10 )', function(done) {
	assert.ok( !Calculator.syntax('( ( 2 / 2 ) + 2 + 5 * 10') );
	done();
    });

    it('returns syntax ok ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1  / 2', function(done) {
	assert.ok(Calculator.syntax('( ( 2 / 2 ) + 2 - 2 * 2 ) + 1 / 2') );
	done();
    });
    
});
