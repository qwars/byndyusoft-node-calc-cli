
export default class Calculator

	def sum a, b
		a + b

	def subtract a, b
		a - b

	def multiply a, b
		a * b

	def divide a, b
		a / b

	def syntax exp
		let simbol = do |s| exp.match(s) || []
		!exp.replace(/(e-\d+)|[0-9\.\,\+-]|[*]|[(]|\/|[)]|\s/g,'') &&
			!exp.match(/\(\s*(\/|\*)/) && !exp.match(/(e|\/|\*|-|\+)\s*\)/) &&
				simbol(/[)]/g):length == simbol(/[(]/g):length

	def calculate exp
		if syntax( exp ) then Function.new( "return { exp.replace /,/g, '.' }" )()
		else false

	def initialize exp

		exp && calculate exp