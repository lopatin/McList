#
# Cursor class
#

mc = McList

class mc.Cursor
	constructor: (@list) ->

	set_char: (new_char) ->
		@char.element.removeClass('cursor') if @char
		@char = new_char
		@char.element.addClass('cursor')

	move_left: ->
		@set_char @char.prev if @char.prev

	move_down: (curr_task) ->
		if curr_task.task_list.start != null
			@set_char curr_task.task_list.start.char_list.end
		else if curr_task.next != null
			@set_char curr_task.next.char_list.end
		else
			_parent = curr_task.parent
			while _parent != null
				if _parent.next != null
					@set_char _parent.next.char_list.end
					return
				else _parent = _parent.parent

	move_up: (curr_task) ->
		if curr_task.prev is null
			if curr_task.parent then @set_char curr_task.parent.char_list.end
			else @set_char curr_task.char_list.start
			return
		else
			prev_subtask = curr_task.prev
			while prev_subtask.task_list.end != null
				prev_subtask = prev_subtask.task_list.end
			@set_char prev_subtask.char_list.end

	move_right: ->
		@set_char @char.next if @char.next

	move_to_last: ->
		@set_char @char.char_list.end if @char.char_list.end

	move_to_first: ->
		@set_char @char.char_list.start if @char.char_list.start
