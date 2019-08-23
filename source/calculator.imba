### Код не принят верховным главнокомандующим, фу регулярные выражения слишком сложны для понимания

let SyntaxExpression = do |exp|
	let simbol = do |s| exp.match(s) || []
	!exp.replace(/(e-\d+)|[0-9\.\,\+-]|[*]|[(]|\/|[)]|\s/g,'') &&
		!exp.match(/\(\s*(\/|\*)/) && !exp.match(/(e|\/|\*|-|\+)\s*\)/) &&
			!exp.replace(/\s+/g, '').match(/(e|\/|\*|-|\+|\.){2}/g) &&
				simbol(/[)]/g):length == simbol(/[(]/g):length

###

import SyntaxExpression from './syntax-expression'

const MathFunction =
	multiply: do |a, b| a * b
	divide: do |a,b| a / b
	subtract: do |a,b| a - b
	sum: do |a,b| a + b


const MathFunctionMap = Map.new [
	[ '*', do |calc| MathFunction:multiply( calc[0], calc[2] ) ]
	[ '/', do |calc| MathFunction:divide( calc[0], calc[2] ) ]
	[ '-', do |calc| MathFunction:subtract( calc[0], calc[2] ) ]
	[ '+', do |calc| MathFunction:sum( calc[0], calc[2] ) ]
]

export default class Calculator

	def calculate exp
		let calculateItem = do |item|
			if item isa Array then calculate item
			else item

		let normaliseArray = do |source|
			source.map do |item, index|
				if item isa Array and item:length == 1 then item[0]
				else item

		let calculateOperator =  do |func, operator|
			this:position = this.includes( operator ) and this.indexOf operator
			while this:position isa Number
				this.splice this:position - 1, 3, func [ this[ this:position - 1 ], this[ this:position ], this[ this:position + 1 ] ]
				this:position = this.includes( operator ) and this.indexOf operator

		if exp isa String then calculate SyntaxExpression exp
		else if exp isa Number then exp
		else if exp isa Array
			exp = normaliseArray exp.map calculateItem
			Object.defineProperty exp, 'position',
				writable: true
				value: null
			exp[0] unless MathFunctionMap.forEach calculateOperator.bind exp

	def initialize exp
		exp && calculate exp