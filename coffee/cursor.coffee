#
# Cursor class
#

mc = McList

class mc.Cursor
	constructor: (@list) ->
		@set_char @list.first_char()

	set_char: (new_char) ->
		@char.element.removeClass('cursor') if @char
		@char = new_char
		@char.element.addClass('cursor')

	move_right: ->
		@set_char @char.next if @char.next

	move_left: ->
		@set_char @char.prev if @char.prev

	move_to_last: ->
		@set_char @char.char_list.end if @char.char_list.end

	move_to_first: ->
		@set_char @char.char_list.start if @char.char_list.start
