#
# List class
#

class McList.List
	constructor: (command_mode = true)->
		@command_mode = command_mode

	enter_command_mode: ->
		@command_mode = true

	enter_insert_mode: ->
		@command_mode = false
