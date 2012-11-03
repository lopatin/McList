#
# Task class
#  - A single list element
#

mc = McList

class mc.Task
    constructor: (@list) ->
	@next = @prev = null
	@char_list = new mc.CharNodeList(@)
	@task_list = new mc.TaskList(@, @list)
	@element = $("<div>").addClass('task')
	@content_div = $("<div>").addClass('content').appendTo(@element)
	@children_div = $("<div>").addClass('children').appendTo(@element)

    if @parent then @parent.children_div.append @element
    else @list.element.append @element

    @render()
    
    render: (recursive) ->
	@content_div.html('')
	for char in @char_list.to_array()
	    @content_div.append $("<div>").addClass('character').html(char.character)

    render: (recursive) ->
	@content_div.html('')
	for char in @char_list.to_array()
	    @content_div.append char.element

    addTaskAfter: () ->
	_task = new mc.Task @list
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

    deleteTask: () ->
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
	temp
