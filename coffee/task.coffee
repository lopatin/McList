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

		if !@parent then @list.element.append @element

		@render()
	
	render: (recursive) ->
		@content_div.html ''
		for char in @char_list.to_array()
			# Render characters and bind events
			((char, list, content_div) ->
				content_div.append char.element
				char.element.click(() -> list.cursor.set_char char)
			)(char, @list, @content_div)

		@children_div.html ''
		if recursive
			for task in @task_list.to_array()
				@children_div.append task.element
				task.render(true)


	addTaskAfter: (_task) ->
		if !_task then _task = new mc.Task @parent, @list
		_task.parent = @parent
		if @next != null
			temp = @next
			_task.next = temp
			@next = _task
			_task.prev = temp.prev
			temp.prev = _task
		else
			_task.prev = @
			@next = _task
		_task

	deleteTask: ->
		if @next != null
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

		temp.set_cursor()

		deleted: this,
		current: temp

	set_cursor: ->
		@list.cursor.set_char @char_list.end

	to_string: ->
		@char_list.to_string()
