#
# Task class
#  - A single list element
#

mc = McList

class mc.Task
	constructor: (@root) ->
		@char_list = new mc.charNodeList()

	render: (recursive) ->
		
