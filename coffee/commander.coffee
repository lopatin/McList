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

		self = this
		$(document).bind 'keydown', (e) ->
			keyval = mc.KeyCodeHelper.get_key_value e
			self.keystroke keyval
			false

	init_special_modes: (event, value) ->
		$(document).bind event, (e) ->
			switch e.keyCode
				when 16 then mc.Commander.shift_mode = value
				when 17 then mc.Commander.control_mode = value
				when 18 then mc.Commander.alt_mode = value

	keystroke: (key) ->
		if key
			@key_queue.push key
		@analyze_queue()
		console.log @key_queue

	analyze_queue: ->
		self = this
		task = mc.app.list.root_task
		charmap = matches.pattern
			"[..., 'escape']": -> 
				if !mc.app.list.command_mode
					mc.app.list.toggle_command_mode()
					self.key_queue = []
			"[..., c]": (c) ->
				# If in command mode
				if mc.app.list.command_mode
					switch c
						when 'i' 
							mc.app.list.toggle_command_mode()

				# If in insert mode
				else
					switch c
						when 'backspace' 
							task.char_list.deleteChar()
						else
							task.char_list.addChar(c)
				task.render()
				self.key_queue = []


		charmap(@key_queue)