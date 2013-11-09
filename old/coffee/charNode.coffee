mc = McList

class mc.CharNode
	constructor: (@char_list, @character = null) ->
		@next = @prev = null
		@element = $("<div>").addClass('character ' + (if !@character then "sentinel" else "")).html(if !@character or @character == ' ' then "&nbsp;" else @character)
		@element.append $("<div class='bottom-row'>");

	addAfter: (input) ->
		_char = new mc.CharNode @char_list, input

		if @char_list.is_empty()
			# console.log 'empty'
			@char_list.start = @char_list.end = _char
			_char.next = _char.prev = null
		else if @next
			temp = @next
			_char.next = temp
			@next = _char
			temp.prev = _char
			_char.prev = this
		else
			@next = _char
			@char_list.end = _char
			_char.prev = this
		_char

	deleteNode: ->
		if @next == null and @prev == null
			@char_list.empty()
			return @char_list.sentinel
		else if @next
			temp = @next
			temp.prev = @prev
			temp = @prev
			temp.next = @next
			@next = @prev = null
		else
			temp = @prev
			@prev = temp.next = null
		temp

	task: ->
		@char_list.task

	is_visible: ->
		@element? && @element.is(":visible")

