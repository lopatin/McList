mc = McList

class mc.CharNodeList
	constructor: () ->
		@current = new mc.CharNode   # cursor
		@start = @end = current
		@length = 1

	getSize: () ->
		@length

	addChar: (input) ->
		@current = @current.addAfter(input)
		@length++

		if @end.next is not null then @end.next = @current
		return

	deleteChar: (node) ->
		if end is not start
			@current = @current.deleteNode(node)
			length--

			if @end.prev is null then @end.prev = @current
		return



