
var assert = require( "assert" );

var SyntaxExpression = require('./syntax-expression.js').SyntaxExpression;

describe('Syntax expression Tests', function() {
    
    it('returns for 2e+1', function(done) {
        assert.ok( SyntaxExpression('2e+1') );
        done();
    });

    it('returns for 2.1', function(done) {
        assert.ok( SyntaxExpression('2.1') );
        done();
    });

    it('returns for -2.1e-8', function(done) {
        assert.ok( SyntaxExpression('-2.1e-8') );
        done();
    });

    it('returns for 1 + 1', function(done) {
        assert.ok( SyntaxExpression('1 + 1') );
        done();
    });

    it('returns for 2 - 2', function(done) {
        assert.ok(SyntaxExpression('2 - 2'));
        done();
    });

    it('returns for 5+-3', function(done) {
        assert.ok(SyntaxExpression('5+-3'));
        done();
    });

    it('returns for 5+(-7)', function(done) {
        assert.ok(SyntaxExpression('5+(-7)'));
        done();
    });

    it('returns for -5+(-7)', function(done) {
        assert.ok(SyntaxExpression('-5+(-7)'));
        done();
    });
    
    it('returns for -2 + 2', function(done) {
        assert.ok(SyntaxExpression('-2 - 2'));
        done();
    });

    it('returns for 2 * 2', function(done) {
        assert.ok(SyntaxExpression('2 * 2'));
        done();
    });

    it('returns for 2 /2', function(done) {
        assert.ok(SyntaxExpression('2 /2'));
        done();
    });

    it('returns for ( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1 ) / 2', function(done) {
        assert.ok(SyntaxExpression('( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1 ) / 2'));
        done();
    });

    it('returns for ( 2 / 2 ) + 2 - 2 * 2 / 2', function(done) {
        assert.ok(SyntaxExpression('( 2 / 2 ) + 2 - 2 * 2 / 2'));
        done();
    });

    it('returns for ( 2 / 2.4 ) + 2.48 - 2 * 2.2', function(done) {
        assert.ok(SyntaxExpression('( 2 / 2.4 ) + 2.48 - 2 * 2.2'));
        done();
    });
    
    it('returns ( ( ( 2e12 / 2 ) + 2e+2 - 2 * 2 / 3e-6 * 5 ) + 1.23  / 2 )', function(done) {
        assert.ok(SyntaxExpression('( ( ( 2e12 / 2 ) + 2 - 2 * 2 / 3e-6 * 5 ) + 1.23  / 2 )'));
        done();
    });
    
    it('returns for error ( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1  / 2', function(done) {
        assert.ok( SyntaxExpression('( ( ( 2 / 2 ) + 2 - 2 * 2 ) + 1 / 2') === null );
        done();
    });
    
    it('returns for error 2e + 1', function(done) {
        assert.ok( SyntaxExpression('2e + 1') === null );
        done();
    });

    it('returns for error 2e', function(done) {
        assert.ok( SyntaxExpression('2e') === null );
        done();
    });

    it('returns for error 2.', function(done) {
        assert.ok( SyntaxExpression('2.') === null );
        done();
    });

    it('returns for error 2. 1', function(done) {
        assert.ok( SyntaxExpression('2. 1') === null );
        done();
    });
    
    it('returns for error 2. + 1', function(done) {
        assert.ok( SyntaxExpression('2. + 1') === null );
        done();
    });

    it('returns for error 2 ++1', function(done) {
        assert.ok( SyntaxExpression('2 ++1') === null );
        done();
    });

    it('returns for error 2**1', function(done) {
        assert.ok( SyntaxExpression('2**1') === null );
        done();
    });

    it('returns for error 2--1', function(done) {
        assert.ok( SyntaxExpression('2--1') === null );
        done();
    });

    it('returns for error --1', function(done) {
        assert.ok( SyntaxExpression('2--1') === null );
        done();
    });    
});
