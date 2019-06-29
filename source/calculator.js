function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };

let SyntaxExpression = function(exp) {
	let simbol = function(s) { return exp.match(s) || []; };
	return !exp.replace(/(e-\d+)|[0-9\.\,\+-]|[*]|[(]|\/|[)]|\s/g,'') && !exp.match(/\(\s*(\/|\*)/) && !exp.match(/(e|\/|\*|-|\+)\s*\)/) && !exp.replace(/\s+/g,'').match(/(e|\/|\*|-|\+|\.){2}/g) && simbol(/[)]/g).length == simbol(/[(]/g).length;
};

function Calculator(exp){
	this['+'] = this.sum;
	this['-'] = this.subtract;
	this['*'] = this.multiply;
	this['/'] = this.divide;
	
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
	return SyntaxExpression(exp);
};

Calculator.prototype.calculation = function (exp){ // вычисление с разбором
	var self = this;
	let signs = ['/','*','+','-'];
	
	let outcome = function(sign) {
		return exp = exp.replace(new RegExp("\\((\\s*\\d+((e|\\.)\\d+)*\\s*)\\)",'g'),'$1').replace(new RegExp(("\\s*\\d+((e|\\.)\\d+)*\\s*\\" + sign + "\\s*\\d+((e|\\.)\\d+)*\\s*")),function(sets) {
			let numbers = sets.split(sign).map(function(n) { return Number(n); });
			return self[sign] && self[sign](numbers[0],numbers[1]);
		});
	};
	
	if (!self.syntax(exp)) { return null } else {
		while (!new RegExp("^\\s*-*\\s*\\d+((e|\\.)\\d+)*\\s*$").test(exp) && signs.filter(function(sg) { return exp.includes(sg); }).length > 0){
			for (let i = 0, items = iter$(signs.filter(function(sg) { return exp.includes(sg); })), len = items.length, sign; i < len; i++) {
				sign = items[i];
				if (!sign.includes('*') && !sign.includes('/')) { exp = exp.replace(new RegExp("\\(|\\)",'g'),' ') };
				outcome(sign);
			};
		};
		
		return Number(exp.trim()) + 0;
	};
};

Calculator.prototype.calculate = function (exp){
	if (this.syntax(exp)) { return new Function(("return " + exp.replace(/,/g,'.')))() } else {
		return null;
	};
};


