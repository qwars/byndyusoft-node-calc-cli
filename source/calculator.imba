
export default class Calculator

	def sum a, b
		if a isa Number and b isa Number then a + b

	def subtract a, b
		if a isa Number and b isa Number then a - b

	def multiply a, b
		if a isa Number and b isa Number then a * b

	def divide a, b
		if a isa Number and b isa Number then a / b

	def calculation exp # вычисление с разбором
		let signs = ['/','*','+','-']
		let outcome = do |sign|
			exp = exp.replace( RegExp.new( "\\((\\s*\\d+((e|\\.)\\d+)*\\s*)\\)", 'g'), '$1' )
				.replace RegExp.new( "\\s*\\d+((e|\\.)\\d+)*\\s*\\{ sign }\\s*\\d+((e|\\.)\\d+)*\\s*"), do |sets|
					let numbers = sets.split( sign ).map do |n| Number n
					if sign == '/' then divide numbers[0], numbers[1]
					else if sign == '*' then multiply numbers[0], numbers[1]
					else if sign == '+' then sum numbers[0], numbers[1]
					else subtract numbers[0], numbers[1]
		while not RegExp.new( "^\\s*-*\\s*\\d+((e|\\.)\\d+)*\\s*$" ).test( exp ) and  signs.filter( do |sg| exp.includes sg ):length > 0
			for sign, i in signs.filter( do |sg| exp.includes sg )
				if !sign.includes('*') && !sign.includes('/') then exp = exp.replace(RegExp.new( "\\(|\\)", 'g'), ' ' )
				outcome( sign )
		Number( exp.trim ) + 0

	def syntax exp
		let simbol = do |s| exp.match(s) || []
		!exp.replace(/(e-\d+)|[0-9\.\,\+-]|[*]|[(]|\/|[)]|\s/g,'') &&
			!exp.match(/\(\s*(\/|\*)/) && !exp.match(/(e|\/|\*|-|\+)\s*\)/) &&
				!exp.replace(/\s+/g, '').match(/(e|\/|\*|-|\+|\.){2}/g) &&
					simbol(/[)]/g):length == simbol(/[(]/g):length

	def calculate exp
		if syntax( exp ) then Function.new( "return { exp.replace /,/g, '.' }" )()
		else null

	def initialize exp

		exp && calculate exp