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
		if @current is null
			_task = new mc.Task @parent, @list if !_task
			@start = @end = @current = _task
			@length++
		else
			@current = @current.addTaskAfter()

		if @end.next != null then @end = @current
		if @start.prev != null then @start = @current
		return

	deleteTaskItem: (return_deleted = null) ->
		if end != start
			@current = @current.deleteTask()
			@length--

			if @end.prev is null then @end = @current
			if @start.next is null then @start = @current
		return

	to_array: () ->
		arr = []
		curr = @start
		while curr
			arr.push curr
			curr = curr.next
		arr

	set_current: (curr) ->
		@current = curr
