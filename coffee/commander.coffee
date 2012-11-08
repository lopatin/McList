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
			e.preventDefault()
			keyval = mc.KeyCodeHelper.get_key_value e
			self.keystroke keyval

	init_special_modes: (event, value) ->
		$(document).bind event, (e) ->
			switch e.keyCode
				when 16 then mc.Commander.shift_mode = value
				when 17 then mc.Commander.control_mode = value
				when 18 then mc.Commander.alt_mode = value

	keystroke: (key) ->
		if key and key != 'shift' and key != 'ctrl' and key != 'alt'
			@key_queue.push key
		@analyze_queue()
		console.log @key_queue

	analyze_queue: ->
		self = this
		task = mc.app.list.cursor.char.char_list.task
		shift_mode = @shift_mode
		charmap = matches.pattern
			"[..., 'escape']": -> 
				if !mc.app.list.command_mode
					mc.app.list.toggle_command_mode()
					self.key_queue = []


			# "[..., c, d]": ([c, d]) ->
			# 	# If in command mode
			# 	if mc.app.list.command_mode
			# 		switch [c, d]
			# 			when ['d', 'd']
			# 				console.log("pizza")
			# 				task.deleteTask()
			# 				mc.app.list.cursor.move_down(task)

			"[..., c]": (c) ->
				if c == 'tab' and task.prev and task.parent
					task.delete().prev.last_child.add_task(task).set_cursor()

				# If in command mode
				if mc.app.list.command_mode
					switch c
						# Movement
						when 'a' 
							mc.app.list.toggle_command_mode()
						when 'i' 
							console.log "I PRESSED"
							mc.app.list.toggle_command_mode()
							mc.app.list.cursor.move_left()
						when 'l', 'right'
							mc.app.list.cursor.move_right()
						when 'h', 'left'
							mc.app.list.cursor.move_left()
						when 'j', 'return', 'down'
							mc.app.list.cursor.move_down()
						when 'k', 'up'
							mc.app.list.cursor.move_up()
						when '$'
							mc.app.list.cursor.move_to_last()
						when '0'
							mc.app.list.cursor.move_to_first()

						# Char operations
						when 'a' 
							mc.app.list.toggle_command_mode()
						when 'i' 
							mc.app.list.toggle_command_mode()
							mc.app.list.cursor.move_left()
						when 'x'
							task.char_list.deleteChar()
							mc.app.list.cursor.move_right()

						# Task operations
						when 'o'
							if !task.char_list.is_empty() and task.parent
								new_task = task.add_task()
								mc.app.list.enter_insert_mode()

						when 'd'
							if task.next then mc.app.list.cursor.move_down()
							else mc.app.list.cursor.move_up()
							task.delete()

				# If in insert mode
				else
					switch c
						when 'backspace' 
							if mc.app.list.cursor.char.prev is null
								task.delete().parent.add_task(task).set_cursor()
							else
								task.char_list.deleteChar()
						when 'return'
							unless task.char_list.is_empty()
								task.add_task()
						else
							task.char_list.addChar(c) unless c.length > 1

				mc.app.list.root_task.render(true)
				mc.app.list.blink_in_second()
				self.key_queue = []



		charmap(@key_queue)
