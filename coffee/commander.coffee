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
		if key
			@key_queue.push key
		@analyze_queue()
		console.log @key_queue

	analyze_queue: ->
		self = this
		task = mc.app.list.cursor.char.char_list.task
		charmap = matches.pattern
			"[..., 'escape']": -> 
				if !mc.app.list.command_mode
					mc.app.list.toggle_command_mode()
					self.key_queue = []
			"[..., c, d]": ([c, d]) ->
				# If in command mode
				if mc.app.list.command_mode
					switch [c, d]
						when ['d', 'd']
							console.log("pizza")
							task.deleteTask()
							mc.app.list.cursor.move_down(task)

			"[..., c]": (c) ->
				# If in command mode
				if mc.app.list.command_mode
					switch c
						# Movement
						when 'l'
							mc.app.list.cursor.move_right()
						when 'a' 
							mc.app.list.toggle_command_mode()
						when 'i' 
							mc.app.list.toggle_command_mode()
						when 'h'
							mc.app.list.cursor.move_left()
						when 'j'
							mc.app.list.cursor.move_down(task)
						when 'k'
							mc.app.list.cursor.move_up(task)
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
						when 'o', 'return'
							task.parent.task_list.set_current task
							task.parent.task_list.addTask() if task.parent
						when 'tab'
							if task.prev and task.parent
								target_task = task.prev
								task.parent.task_list.set_current task
								deleted_task = task.parent.task_list.deleteTaskItem()
								target_task.task_list.addTask deleted_task
						when 'd'
							task.parent.task_list.set_current task
							task.parent.task_list.deleteTaskItem()

				# If in insert mode
				else
					switch c
						when 'backspace' 
							task.char_list.deleteChar()
						when 'return'
							task.parent.task_list.addTask() if task.parent
						else
							task.char_list.addChar(c) unless c.length > 1
				mc.app.list.root_task.render(true)
				mc.app.list.blink_in_second()
				self.key_queue = []


		charmap(@key_queue)
