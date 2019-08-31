
var assert = require( "assert" );

var Calculator = ( fn => new  fn() )( require('./calculator.js').default );

describe('Calculator Tests', function() {
    
    it('returns for error 2 ++1', function(done) {
        assert.equal( Calculator.calculate('2 ++1'), 3 );
        done();
    });

    it('returns for error 2--1', function(done) {
        assert.equal( Calculator.calculate('2--1'), 3 );
        done();
    });

    it('returns for error --1', function(done) {
        assert.equal( Calculator.calculate('--1'), 1 );
        done();
    });    

    
    it('returns 1 + 1 = 2', function(done) {
        assert.equal(Calculator.calculate('1 + 1'), 2);
        done();
    });

    it('returns 2 - 2 = 0', function(done) {
        assert.equal(Calculator.calculate('2 - 2'), 0);
        done();
    });

    it('returns -2 - 2 = -4', function(done) {
        assert.equal(Calculator.calculate('-2 - 2'), -4 );
        done();
    });

    it('returns for -5+-7', function(done) {
        assert.equal(Calculator.calculate('-5+(-7)'), -12 );
        done();
    });

    
    it('returns for -5+(-7)', function(done) {
        assert.equal(Calculator.calculate('-5+(-7)'), -12 );
        done();
    });

    it('returns 2 * 2 = 4', function(done) {
        assert.equal(Calculator.calculate('2 * 2 '), 4);
        done();
    });
    
    it('returns 2 / 2 = 1', function(done) {
        assert.equal(Calculator.calculate(' 2 / 2 '), 1);
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
    
    it('returns 2.4 / 2 = 1.2', function(done) {
        assert.equal(Calculator.calculate(' 2.4 / 2 '), 1.2);
        done();
    });
    
    it('returns error ( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1  / 2 = 0', function(done) {
        assert.equal(Calculator.calculate('( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1 / 2'), null );
        done();
    });

    it('returns ( ( ( 2 / 2 ) + 2 - 2 * 2 / 3 * 5 ) + 1  / 2 ) * 0', function(done) {
        assert.equal( Calculator.calculate(' ( ( ( 2 / 2 ) + 2 -  2 * 2 / 3 * 5 ) + 1  / 2 ) * 0'), -0 );
        done();
    });

    it('returns ( ( 2 / 2 ) + 2 - 5 * 1 ) = -2', function(done) {
        assert.equal( Calculator.calculate('( ( 2 / 2 ) + 2 - 5 * 1 )'), -2 );
        done();
    });
    
    it('returns ( ( 2 / 2 ) + 2 - 5 * 10 ) = -47', function(done) {
        assert.equal( Calculator.calculate('( ( 2 / 2 ) + 2 - 5 * 10 )'), -47 );
        done();
    });

    it('returns ( ( 2 / 2 ) + 2 + 5 * 10 ) = 53', function(done) {
        assert.equal( Calculator.calculate('( ( 2 / 2 ) + 2 + 5 * 10 )'), 53 );
        done();
    });    
});
