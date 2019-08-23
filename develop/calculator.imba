import './calculator.styl'

import default as Calc from '../source/calculator'

import SyntaxExpression from '../source/syntax-expression'

export tag Calculator < form

	prop selectionStart
	prop selectionEnd
	prop expressionSplitted

	def setup
		@calculator = Calc.new

	def mount
		querySelector('input').focus
		@expressionSplitted = Array @selectionEnd = @selectionStart = 0

	def norm
		@expression.value.replace(/×/g, '*').replace(/÷/g, '/')

	def testingExpression
		@calculate = @pattern = false
		@expressionSplitted = @expression.value.split ''
		render if @expression.value.replace(/\s+/g, '') then @pattern = SyntaxExpression( norm ) ? '.*' : '^ $'

	def selectionInput
		@selectionEnd = @expression.dom:selectionEnd
		@selectionStart = @expression.dom:selectionStart

	def insertCode code
		@expressionSplitted.splice @selectionStart, 0, code
		@expression.value = @expressionSplitted.join ''
		@selectionEnd = @selectionStart += code:length
		@expression.focus
		testingExpression @expression.dom.setSelectionRange @selectionStart, @selectionEnd

	def deleteCode
		if @selectionEnd
			console.log @selectionEnd - @selectionStart
			@expressionSplitted.splice @selectionStart - 1, 1
			@expression.value = @expressionSplitted.join ''
			@selectionEnd = @selectionStart -= 1
			@expression.focus
			testingExpression @expression.dom.setSelectionRange @selectionStart, @selectionEnd

	def calculateExpression
		if SyntaxExpression norm
			render @calculate = !!@expression.value = @calculator.calculate norm
			@expressionSplitted = @expression.value.split ''
			@selectionStart = @selectionEnd = @expressionSplitted:length


	def render
		<self#Calculator :submit.prevent.calculateExpression > <label>
			<input@expression .calculate=@calculate type="text"
				:keyup.selectionInput
				:mouseup.selectionInput
				:input.testingExpression pattern=@pattern
				required=(!!@expression.value.replace(/\s+/g, ''))>
			<blockquote>
				for item, index in Array(10)
					<var :tap.insertCode(index.toString)> index if index
				<var :tap.insertCode('0')> 0
				<var :tap.insertCode('.')> '.'
				<var :tap.insertCode(' ( ')> '('
				<var :tap.insertCode(' ) ')> ')'
				<span :tap.insertCode(' + ')> '+'
				<span :tap.insertCode(' - ')> '-'
				<span html="&#215;" :tap.insertCode(' × ')>
				<span html="&#247;" :tap.insertCode(' ÷ ')>
				<span html="&#9003;" :tap.deleteCode>
				<span :tap.calculateExpression> '='
