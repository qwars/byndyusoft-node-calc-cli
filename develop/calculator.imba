import './calculator.styl'

import default as Calc from '../source/calculator.imba'

export tag Calculator < form

	def setup
		@calculator = Calc.new

	def mount
		querySelector('input').focus

	def normalise
		render @expression.value = @expression.value.replace(/\s+/g, ' ')

	def norm
		@expression.value.replace(/×/g, '*').replace(/÷/g, '/')

	def testingExpression
		@calculate = @pattern = false
		normalise if @expression.value.replace(/\s+/g, '') then @pattern = @calculator.syntax( norm ) ? '.*' : '^ $'

	def insertCode code
		normalise @expression.value += code

	def deleteCode
		normalise @expression.value = @expression.value.replace(/\s*\S\s*$/,'')

	def calculateExpression
		if @calculator.syntax norm then render @calculate = !!@expression.value = @calculator.calculate norm

	def render
		<self#Calculator :submit.prevent.calculateExpression >
			<label>
				<input@expression .calculate=@calculate type="text" :input.testingExpression pattern=@pattern
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
				<span :tap.calculateExpression> '='
