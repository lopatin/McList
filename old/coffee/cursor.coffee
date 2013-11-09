#
# Cursor class
#

mc = McList

class mc.Cursor
	constructor: (@list) ->
		# History of characters this cursor has been on. 
		# Used to restore cursor focus when it is lost
		@char_history = []

	set_char: (new_char) ->
		@char.element.removeClass('cursor') if @char
		@char = new_char
		@char.element.addClass('cursor')
		@list.render()

		@add_to_char_history(new_char)

		# console.log "cursor on: "
		# console.log @char.char_list.task

	set_task: (new_task) ->
		new_task.set_cursor()

	move_left: ->
		@set_char @char.prev if @char.prev

	move_down: ->
		next = @char.task().next
		if @char.task().has_children()
			@set_task @char.task().first_child
		else if next
			@set_task next
		else
			curr = @char.task().parent
			while curr
				if curr.next
					@set_task curr.next
					return
				curr = curr.parent

		# if curr_task.task_list.start != null
		# 	@set_char curr_task.task_list.start.char_list.end
		# else if curr_task.next != null
		# 	@set_char curr_task.next.char_list.end
		# else
		# 	_parent = curr_task.parent
		# 	while _parent != null
		# 		if _parent.next != null
		# 			@set_char _parent.next.char_list.end
		# 			return
		# 		else _parent = _parent.parent

	move_up: ->
		prev = @char.task().prev
		if prev 
			temp = prev.get_last_child(true) or prev
			@set_task (temp)
			# console.log prev.to_string()
		else if not @char.task().parent.is_root()
			@set_task @char.task().parent

		# if curr_task.prev is null
		# 	if curr_task.parent then @set_char curr_task.parent.char_list.end
		# 	else @set_char curr_task.char_list.start
		# 	return
		# else
		# 	prev_subtask = curr_task.prev
		# 	while prev_subtask.task_list.end != null
		# 		prev_subtask = prev_subtask.task_list.end
		# 	@set_char prev_subtask.char_list.end

	move_right: ->
		@set_char @char.next if @char.next

	move_to_last: ->
		@set_char @char.char_list.end if @char.char_list.end

	move_to_first: ->
		@set_char @char.char_list.start if @char.char_list.start

	task: ->
		@char.task()

	add_to_char_history: (char) ->
		@char_history.unshift(char) unless @char_history[0] and @char_history[0].character != char.character

		# Trim the queue
		if @char_history.length > 1000
			@char_history.splice @char_history.length-1, 1

	ensure_focus: ->
		if not (@char && @char.is_visible())
			console.log "ensure 1"
			console.log ("char_history.length = " + @char_history.length)
			focused = false
			for char in @char_history
				if char && char.is_visible() && !focused
					console.log "ENSURE FOCUS"
					@set_char char
					focused = true
			


