import './calculator.styl'

import default as Calc from '../source/calculator.imba'

export tag Calculator < form

	def setup
		@calculator = Calc.new

	def normalise
		render @expression.value = @expression.value.replace(/\s+/g, ' ')

	def testingExpression
		@pattern = false
		normalise if @expression.value.replace(/\s+/g, '') then @pattern = @calculator.syntax( @expression.value.replace(/×/g, '*').replace(/÷/g, '/') ) ? '.*' : '^ $'

	def insertCode code
		normalise @expression.value += code

	def deleteCode
		normalise @expression.value = @expression.value.replace(/\s*\S\s*$/,'')

	def render
		<self#Calculator>
			<label>
				<input@expression type="text" :input.testingExpression pattern=@pattern
					required=(!!@expression.value.replace(/\s+/g, ''))>
			<blockquote>
				for item, index in Array(10)
					<var :tap.insertCode(index)> index if index
				<var :tap.insertCode(0)> 0
				<var :tap.insertCode('.')> '.'
				<var :tap.insertCode(' ( ')> '('
				<var :tap.insertCode(' ) ')> ')'
				<span :tap.insertCode(' + ')> '+'
				<span :tap.insertCode(' - ')> '-'
				<span html="&#215;" :tap.insertCode(' × ')>
				<span html="&#247;" :tap.insertCode(' ÷ ')>
				<span html="&#9003;" :tap.deleteCode>
				<span> '='
