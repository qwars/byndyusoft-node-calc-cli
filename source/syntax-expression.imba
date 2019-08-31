
const NumberFound = do |found=[]|
	found:length > 0 and " , { found.join '' } , "

const LeftSquareBracket = do |source|
	source.replace( /\[\s*,\s*/g, '[' ).replace /\[\s*\+/g, '['

const RightSquareBracket = do |source|
	source.replace /\s*,\s*\]/g, ']'


###

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

###

export def SyntaxExpression exp
	let found = []
	let parse = []

	###

		exp.match( /[^0-9\.\-\+\*\/\)\(e\s]/ ) - Не принимаем если есть кроме заявленных символов
		exp.match( /[^0-9\.\-\+\*\/\)\(e\s]/ ) - Не принимаем если есть явная ошибка в выражении
		exp.match( /[e\.]\s+/ ) - Не принимаем если есть число не полное ( опечатка может )
		Все остальное проверяется даже если в числах есть ошибка или опечатка

	###
	# Вот даже не знаю, или эту строку нужно по другому написать.
	return null if exp.match( /[^0-9\.\-\+\*\/\)\(e\s]/ ) or exp.match(/\*{2}|\/{2}/) or exp.match /[e\.]\s+/

	for item in exp.replace(/--|\+\+/g, '+').trim.split("") when item.trim !== ''
		if item == ')' and found:length > 0 then found.push ']'
		else if item == '(' then parse.push '['
		else if ['+', '-' ].includes( item ) and Number found:length == 0 or found.slice(-1)[0] == 'e' then found.push item
		else if ['*' , '/', '+', '-' ].includes( item ) and Number found.slice(-1)[0] == ']' or found.slice(-1)[0] then parse.push "{ NumberFound( found.slice, found = [] ) }\"{ item }\""
		else if [ '.', 'e' ].includes( item ) and Number found.slice(-1)[0] then found.push item
		else if  Number item == '0' or item then found.push item
		else return null

	if found:length > 0
		if Number found.slice(-1)[0] == ']' or found.slice(-1)[0] == '0' or found.slice(-1)[0] then parse.push NumberFound found.slice
		else return null

	unless parse:length > 0 then null
	else
		try
			JSON.parse RightSquareBracket LeftSquareBracket "[ { parse.join('').replace(/\"\[/g, '", [') } ]"
		catch err
			null