
export default class Calculator

	def sum a, b
		if a isa Number and b isa Number then a + b

	def subtract a, b
		if a isa Number and b isa Number then a - b

	def multiply a, b
		if a isa Number and b isa Number then a * b

	def divide a, b
		if a isa Number and b isa Number then a / b

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