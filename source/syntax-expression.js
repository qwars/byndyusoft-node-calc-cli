function iter$(a) {
    return a ? (a.toArray ? a.toArray() : a) : [];
};
var self = {};

const NumberFound = function(found) {
    if (found === undefined) found = [];
    return found.length > 0 && (" , " + found.join('') + " , ");
};

const LeftSquareBracket = function(source) {
    return source.replace(/\[\s*,\s*/g, '[');
};

const RightSquareBracket = function(source) {
    return source.replace(/\s*,\s*\]/g, ']');
};


/*

Раширение фунционала

var matho = {
	'sin': '⊕'
	'cos': '⊖'
	'tg': '⊗'
	'ctg': '⊘'
}

function normaliseExp( exp ) {
	for( let prop of matho ){
		exp = exp.replace( RegExp.new( key, 'g' ), matho[ key ] )
	}
}

function resporeExp( exp ) {
	for( let prop of matho ){
		exp = exp.replace( RegExp.new( matho[ key ], 'g' ), key )
	}
}


SyntaxExpression - возвращает массив вида

	[ number, operator, number ]
	[ number, operator, [ number, operator, number ] ]
	[ operator, number ]
	[ operator, [ number ] ]

Этого думаю будет достаточно для создания обработчика сложных ( с sin, cos и других математических функций из Math ) выражения

*/


exports.SyntaxExpression = self.SyntaxExpression = function(exp) {
    let found = [];
    let parse = [];

    /*
    
    		exp.match( /[^0-9\.\-\+\*\/\)\(e\s]/ ) - Не принимаем если есть кроме заявленных символов
    		exp.match( /[^0-9\.\-\+\*\/\)\(e\s]/ ) - Не принимаем если есть явная ошибка в выражении
    		exp.match( /[e\.]\s+/ ) - Не принимаем если есть число не полное ( опечатка может )
    		Все остальное проверяется даже если в числах есть ошибка или опечатка
    
    	*/

    // Вот даже не знаю, или эту строку нужно по другому написать.
    if (exp.match(/[^0-9\.\-\+\*\/\)\(e\s]/) || exp.match(/[\-\+\*\/]{2}/) || exp.match(/[e\.]\s+/)) {
        return null
    };

    for (let i = 0, items = iter$(exp.trim().split("")), len = items.length, item; i < len; i++) {
        item = items[i];
        if (item.trim() === '') {
            continue;
        };
        if (item == ')' && found.length > 0) {
            found.push(']')
        } else if (item == '(') {
            parse.push('[')
        } else if (['+', '-'].includes(item) && Number(found.length == 0 || found.slice(-1)[0] == 'e')) {
            found.push(item)
        } else if (['*', '/', '+', '-'].includes(item) && Number(found.slice(-1)[0] == ']' || found.slice(-1)[0])) {
            parse.push(("" + NumberFound(found.slice(), found = []) + "\"" + item + "\""))
        } else if (['.', 'e'].includes(item) && Number(found.slice(-1)[0])) {
            found.push(item)
        } else if (Number(item == '0' || item)) {
            found.push(item)
        } else {
            return null;
        };
    };


    if (found.length > 0) {
        if (Number(found.slice(-1)[0] == ']' || found.slice(-1)[0] == '0' || found.slice(-1)[0])) {
            parse.push(NumberFound(found.slice()))
        } else {
            return null;
        };
    };

    if (parse.length <= 0) {
        return null
    } else {
        try {
            return JSON.parse(RightSquareBracket(LeftSquareBracket(("[ " + parse.join('') + " ]"))));
        } catch (err) {
            return null;
        };
    };
};