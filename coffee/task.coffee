#
# Task class
#  - A single list element
#

mc = McList

class mc.Task
	constructor: (@parent, @list) ->
		@char_list = new mc.CharNodeList(this)

		@element = $("<div>").addClass('task')
		@content_div = $("<div>").addClass('content').appendTo(@element)
		@children_div = $("<div>").addClass('chlidren').appendTo(@element)

		if @parent
			@parent.chlidren_div.append @element
		else
			@list.element.append @element

		@render()

	render: (recursive) ->
		@content_div.html('')
		for char in @char_list.to_array()
			@content_div.append char.element

