
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

Calculator.prototype.syntax = function (exp){
	let simbol = function(s) { return exp.match(s) || []; };
	return !exp.replace(/(e-\d+)|[0-9\.\,\+-]|[*]|[(]|\/|[)]|\s/g,'') && !exp.match(/\(\s*(\/|\*)/) && !exp.match(/(e|\/|\*|-|\+)\s*\)/) && !exp.replace(/\s+/g,'').match(/(e|\/|\*|-|\+|\.){2}/g) && simbol(/[)]/g).length == simbol(/[(]/g).length;
};

Calculator.prototype.calculate = function (exp){
	if (this.syntax(exp)) { return new Function(("return " + exp.replace(/,/g,'.')))() } else {
		return null;
	};
};


