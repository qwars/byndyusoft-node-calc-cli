
function Calculator(exp){
	
	exp && this.calculate(exp);
};
exports.default = Calculator; // export class 
Calculator.prototype.sum = function (a,b){
	if ((typeof a=='number'||a instanceof Number) && (typeof b=='number'||b instanceof Number)) { return a + b };
};

Calculator.prototype.subtract = function (a,b){
	if ((typeof a=='number'||a instanceof Number) && (typeof b=='number'||b instanceof Number)) { return a - b };
};

Calculator.prototype.multiply = function (a,b){
	if ((typeof a=='number'||a instanceof Number) && (typeof b=='number'||b instanceof Number)) { return a * b };
};

Calculator.prototype.divide = function (a,b){
	if ((typeof a=='number'||a instanceof Number) && (typeof b=='number'||b instanceof Number)) { return a / b };
};

Calculator.prototype.calculation = function (exp){ // вычисление с разбором
	var self = this;
	let signs = ['/','*','+','-'];
	let outcome = function(sign) {
		var res = [];while (!new RegExp('^-*\\s*\\d+((e|\\.)\\d+)*$').test(exp) && new RegExp(("\\" + sign)).test(exp)){
			res.push((exp = exp.replace(new RegExp("\\((\\s*\\d+((e|\\.)\\d+)*\\s*)\\)",'g'),'$1').replace(new RegExp(("\\s*\\d+((e|\\.)\\d+)*\\s*\\" + sign + "\\s*\\d+((e|\\.)\\d+)*\\s*")),function(sets) {
				let numbers = sets.split(sign).map(function(n) { return Number(n); });
				if (sign == '/') { return self.divide(numbers[0],numbers[1]) } else if (sign == '*') { return self.multiply(numbers[0],numbers[1]) } else if (sign == '+') { return self.sum(numbers[0],numbers[1]) } else {
					return self.subtract(numbers[0],numbers[1]);
				};
			})));
		};return res;
	};
	
	let res = [];
	for (let i = 0, len = signs.length, sign; i < len; i++) {
		sign = signs[i];
		if (!sign.includes('*') && !sign.includes('/')) { exp = exp.replace(new RegExp("\\(|\\)",'g'),' ') };
		if (i && sign.includes(signs[i - 1])) { outcome(signs[i - 1]) };
		res.push(outcome(sign));
	};
	return res;
};


Calculator.prototype.syntax = function (exp){
	let simbol = function(s) { return exp.match(s) || []; };
	return !exp.replace(/(e-\d+)|[0-9\.\,\+-]|[*]|[(]|\/|[)]|\s/g,'') && !exp.match(/\(\s*(\/|\*)/) && !exp.match(/(e|\/|\*|-|\+)\s*\)/) && !exp.replace(/\s+/g,'').match(/(e|\/|\*|-|\+|\.){2}/g) && simbol(/[)]/g).length == simbol(/[(]/g).length;
};

Calculator.prototype.calculate = function (exp){
	if (this.syntax(exp)) { return new Function(("return " + exp.replace(/,/g,'.')))() } else {
		return null;
	};
};


