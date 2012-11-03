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

		if @end.next is not null
			@end.next = @current



