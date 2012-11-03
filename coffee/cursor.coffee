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

	move_down: ->
		if @char.char_list.task.task_list.start != null
			@set_char @char.char_list.task.task_list.start.char_list.end
		else if @char.char_list.task.next != null
			@set_char @char.char_list.task.next.char_list.end
		else
			_parent = @char.char_list.task.parent
			while _parent != null
				if _parent.next != null
					@set_char _parent.next.char_list.end
					return
				else _parent = _parent.parent

	move_up: ->
		_task = @char.char_list.task
		if _task.prev is null
			if _task.parent then @set_char _task.parent.char_list.end
			else move_to_first()
			return
		else
			prev_subtask = _task.prev
			while prev_subtask.task_list.end != null
				prev_subtask = prev_subtask.task_list.end
			@set_char prev_subtask.char_list.end

	move_right: ->
		@set_char @char.next if @char.next

	move_to_last: ->
		@set_char @char.char_list.end if @char.char_list.end

	move_to_first: ->
		@set_char @char.char_list.start if @char.char_list.start
