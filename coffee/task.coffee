#
# Task class
#  - A single list element
#

mc = McList

class mc.Task
	constructor: (@parent, @list, @sentinel) ->
		@next = @prev = null
		if not @parent or not @sentinel
			@child_sentinel = new mc.Task this, @list, true
			@first_child = @last_child = @child_sentinel
		else
			@first_child = @last_child = null


		@char_list = new mc.CharNodeList(@)

		@element = $("<div>").addClass('task')
		@content_div = $("<div></div>").addClass('content').appendTo(@element)
		@children_div = $("<div>").addClass('children').appendTo(@element)

		@set_cursor()

		if !@parent then @list.element.append @element

		@render()
	
	render: (recursive) ->
		if @sentinel then return
		@content_div.html ''
		for char in @char_list.to_array()
			# Render characters and bind events
			((char, list, content_div) ->
				content_div.append char.element
				char.element.bind('click mousedragged mousedown',() -> list.cursor.set_char char)
			)(char, @list, @content_div)

		@children_div.html ''
		if recursive
			for task in @get_children()
				@children_div.append task.element
				task.render(true)

	# Add a sibling task
	add_task: (new_task, insert_before) ->
		if not @parent then return null

		if not new_task then new_task = new mc.Task @parent, @list
		new_task.parent = @parent
		new_task.list = @list
		
		if @sentinel
			@parent.first_child = @parent.last_child = new_task
			new_task.next = new_task.prev = null
		else if insert_before 
			if @parent.first_child is this then @parent.first_child = new_task
			insert.call this, 'prev', 'next', new_task
		else 
			if @parent.last_child is this then @parent.last_child = new_task
			insert.call this, 'next', 'prev', new_task
		new_task	

	insert = (dir1, dir2, new_task)->
		if @[dir1]
			temp = @[dir1] 
			new_task[dir1] = temp
			@[dir1] = new_task 
			new_task[dir2] = temp[dir2] 
			temp[dir2] = new_task 
		else
			new_task[dir2] = this
			new_task[dir1] = null
			@[dir1] = new_task 

	is_root: ->
		!@parent

	delete: ->
		if not @parent then return null

		if @next and @prev
			@next.prev = @prev
			@prev.next = @next
		else if @next
			@next.prev = null
			@parent.first_child = this
		else if @prev
			@prev.next = null
			@parent.last_child = this
		else
			console.log "SETTING SENTINEL IN PARENT"
			@parent.first_child = @parent.last_child = @parent.child_sentinel

		return this


	get_children: ->
		arr = []
		curr = @first_child
		while curr
			arr.push curr
			curr = curr.next
		arr

	has_children: ->
		ret = @first_child and @first_child isnt @child_sentinel
		console.log "HAS CHILDREN: " + ret
		ret

	set_cursor: ->
		console.log @list
		@list.cursor.set_char @char_list.end
		@list.render()

	get_last_child: (recursive) ->
		if @sentinel
			@parent
		else if recursive and @has_children()
			@last_child.get_last_child(true)
		else if @last_child.sentinel
			null
		else
			@last_child


	to_string: ->
		@char_list.to_string()
