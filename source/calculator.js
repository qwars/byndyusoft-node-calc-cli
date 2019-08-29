/* Код не принят верховным главнокомандующим, фу регулярные выражения слишком сложны для понимания

let SyntaxExpression = do |exp|
	let simbol = do |s| exp.match(s) || []
	!exp.replace(/(e-\d+)|[0-9\.\,\+-]|[*]|[(]|\/|[)]|\s/g,'') &&
		!exp.match(/\(\s*(\/|\*)/) && !exp.match(/(e|\/|\*|-|\+)\s*\)/) &&
			!exp.replace(/\s+/g, '').match(/(e|\/|\*|-|\+|\.){2}/g) &&
				simbol(/[)]/g):length == simbol(/[(]/g):length

*/


var SyntaxExpression = require('./syntax-expression').SyntaxExpression;

const MathFunction = {
    multiply: function(a, b) {
        return a * b;
    },
    divide: function(a, b) {
        return a / b;
    },
    subtract: function(a, b) {
        return a - b;
    },
    sum: function(a, b) {
        return a + b;
    }
};


const MathFunctionMap = new Map([
    ['*', function(calc) {
        return MathFunction.multiply(calc[0], calc[2]);
    }],
    ['/', function(calc) {
        return MathFunction.divide(calc[0], calc[2]);
    }],
    ['-', function(calc) {
        return MathFunction.subtract(calc[0], calc[2]);
    }],
    ['+', function(calc) {
        return MathFunction.sum(calc[0], calc[2]);
    }]
]);

function Calculator(exp) {
    exp && this.calculate(exp);
};
exports.default = Calculator; // export class 
Calculator.prototype.calculate = function(exp) {
    var self = this;
    let calculateItem = function(item) {
        if (item instanceof Array) {
            return self.calculate(item)
        } else {
            return item;
        };
    };

    let normaliseArray = function(source) {
        return source.map(function(item, index) {
            if ((item instanceof Array) && item.length == 1) {
                return item[0]
            } else {
                return item;
            };
        });
    };

    let calculateOperator = function(func, operator) {
        this.position = this.includes(operator) && this.indexOf(operator);
        var res = [],
            position_;
        while ((typeof(position_ = this.position) == 'number' || position_ instanceof Number)) {
            this.splice(this.position - 1, 3, func([this[this.position - 1], this[this.position], this[this.position + 1]]));
            res.push((this.position = this.includes(operator) && this.indexOf(operator)));
        };
        return res;
    };

    if ((typeof exp == 'string' || exp instanceof String)) {
        return self.calculate(SyntaxExpression(exp))
    } else if ((typeof exp == 'number' || exp instanceof Number)) {
        return exp
    } else if (exp instanceof Array) {
        exp = normaliseArray(exp.map(calculateItem));
        Object.defineProperty(exp, 'position', {
            writable: true,
            value: null
        });
        if (!MathFunctionMap.forEach(calculateOperator.bind(exp))) {
            return exp[0]
        };
    };
};