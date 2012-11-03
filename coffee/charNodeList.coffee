mc = McList

class mc.CharNodeList
	constructor: (@task) ->
		@sentinel = new mc.CharNode this   # cursor
		@start = @end = @sentinel
		@length = 1

	getSize: () ->
		@length

	addChar: (input) ->
		@task.list.cursor.set_char @task.list.cursor.char.addAfter(input)
		@length++

	deleteChar: (node) ->
		@task.list.cursor.set_char @task.list.cursor.char.deleteNode()
		@length--

	to_array: ->
		arr = []
		curr = @start
		while curr
			arr.push curr
			curr = curr.next
		arr

	is_empty: ->
		@start.character == null

	empty: ->
		@start = @end = @sentinel
		@task.list.cursor.set_char @sentinel
