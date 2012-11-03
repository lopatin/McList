#
# List class
#

mc = McList

class mc.List
	constructor: (@command_mode)->
		@element = $("#mainList")
		@root_task = new mc.Task(null, this)
		@update_status_bar()

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
		else
			$("#status").removeClass 'command_mode'
