#
# Task class
#  - A single list element
#

mc = McList

class mc.Task
	constructor: (@parent, @list) ->
		@next = @prev = null
		@char_list = new mc.CharNodeList(@)
		@task_list = new mc.TaskList(@, @list)
		@element = $("<div>").addClass('task')
		@content_div = $("<div>").addClass('content').appendTo(@element)
		@children_div = $("<div>").addClass('children').appendTo(@element)

		@list.cursor.set_char @char_list.end

		if @parent then @parent.children_div.append @element
		else @list.element.append @element

		@render()
	
	render: (recursive) ->
		@content_div.html ''
		for char in @char_list.to_array()
			@content_div.append char.element

		if recursive
			for task in @task_list.to_array()
				task.render()


	addTaskAfter: (_task) ->
		_task = new mc.Task @parent, @list if !_task
		if @next is not null
			temp = @next
			_task.next = temp
			@next = _task
			_task.prev = temp.prev
			temp.prev = _task
		else
			_task.prev = @
			@next = _task
		_task

	deleteTask: (return_deleted) ->
		if @next is not null
			temp = @next
			temp.prev = @prev
			if @prev != null
				temp = @prev
				temp.next = @next
			@next = @prev = null
		else
			if @prev != null
				temp = @prev
				@prev = temp.next = null

		deleted: this
		current: temp
