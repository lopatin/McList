mc = McList

class mc.CharNodeList
	constructor: (@task) ->
		@current = new mc.CharNode this   # cursor
		@start = @end = @current
		@length = 1

	getSize: () ->
		@length

	addChar: (input) ->
		@current = @current.addAfter(input)
		@length++

		if @current.next is null then @end = @current
		return

	deleteChar: (node) ->
		if @end != @start
			@current = @current.deleteNode(node)
			length--

			if @current.next is null then @end = @current
		return

	to_array: ->
		arr = []
		curr = @start
		while curr
			arr.push curr
			curr = curr.next
		arr
