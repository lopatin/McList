#
# List class
#

mc = McList

class mc.List
	constructor: (@command_mode)->
		@element = $("#mainList")
		@root_task = new mc.Task(null, this)
		@update_status_bar()
		@cursor = new mc.Cursor(this)


		# @root_task.char_list.addchar('a')
		# @root_task.char_list.addchar('b')
		# @root_task.char_list.addchar('c')
		# @root_task.char_list.addchar('d')

		@root_task.render()

		@blink_in_second()

	enter_command_mode: ->
		@command_mode = true
		@update_status_bar()

	enter_insert_mode: ->
		@command_mode = false
		@update_status_bar()

	toggle_command_mode: ->
		@command_mode = !@command_mode
		@update_status_bar()

	update_status_bar: ->
		if @command_mode
			$("#status").addClass 'command_mode'
			@element.addClass 'command_mode'
		else
			$("#status").removeClass 'command_mode'
			@element.removeClass 'command_mode'

	first_char: ->
		@root_task.char_list.start

	blink_in_second: ->
		clearInterval @cursor_timer if @cursor_timer
		@element.addClass 'show-cursor'
		self = this
		@cursor_timer = setInterval ->
			self.element.toggleClass 'show-cursor'
		, 500
