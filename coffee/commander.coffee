#
# Commander class
#  - Hold incoming key strokes in a queue
#  - Match for commands and execute if match found
#

mc = McList

mc.Commander = 
	shift_mode: false
	control_mode: false
	alt_mode: false

	key_queue: [] # Head is first element, tail is last

	init: ->
		@init_special_modes 'keydown', true
		@init_special_modes 'keyup', false 

		that = this
		$(document).bind 'keydown', (e) ->
			keyval = mc.KeyCodeHelper.get_key_value e
			that.keystroke keyval

	init_special_modes: (event, value) ->
		$(document).bind event, (e) ->
			switch e.keyCode
				when 16 then mc.Commander.shift_mode = value
				when 17 then mc.Commander.control_mode = value
				when 18 then mc.Commander.alt_mode = value

	keystroke: (key) ->
		@key_queue.push key
		console.log @key_queue
