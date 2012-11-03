#
# TaskList class
#  - A list element
#

mc = McList

class mc.TaskList
	constructor: (@parent, @list) ->
		@start = @end = @current = null
		@length = 0

	addTask: () ->
		if @current is null
			_task = new mc.Task @list
			@start = @end = @current = _task
			@length++
		else
			@current = @current.addTaskAfter()

		if @end.next != null then @end = @current
		if @start.prev != null then @start = @current
		return

	deleteTaskItem: () ->
		if end != start
			@current = @current.deleteTask()
			@length--

			if @end.prev is null then @end = @current
			if @start.next is null then @start = @current
		return
