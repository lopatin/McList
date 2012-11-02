#
# List class
#

mc = McList

class mc.List
	constructor: (command_mode = true)->
		@command_mode = command_mode

	enter_command_mode: ->
		@command_mode = true
		$("#status").addClass('command_mode');

	enter_insert_mode: ->
		@command_mode = false
		$("#status").addClass('insert_mode');
