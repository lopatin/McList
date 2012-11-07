#
# TaskList class
#  - A list element
#

mc = McList

class mc.TaskList
	constructor: (@parent, @list) ->
		@start = @end = @current = null
		@length = 0

	addTask: (_task) ->
		if _task
			console.log _task.char_list.to_string()
			console.log "belongs to " + _task.parent.char_list.to_string()
		if @current is null
			_task = new mc.Task @parent, @list if !_task
			@start = @end = @current = _task
			@length++
		else
			_task.parent = @parent if _task
			@current = @current.add_task _task, false

		if @end.next != null then @end = @current
		if @start.prev != null then @start = @current
		return _task

	deleteTaskItem: () ->
		if @end != @start
			delete_return = @current.deleteTask()
			@current = delete_return.current
			@length--

			if @end.prev is null then @end = @current
			if @start.next is null then @start = @current
			return delete_return.deleted

	to_array: () ->
		arr = []
		curr = @start
		while curr
			arr.push curr
			curr = curr.next
		arr

	set_current: (curr) ->
		@current = curr
