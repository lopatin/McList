#
# Main Mclist Applciation
#

mc = McList

class mc.Mclist
	constructor: (@main_list_element) ->
		@list = new mc.List(true, @main_list_element)
		mc.Commander.init()

#
# Run the app 
#

$( ->
	mc.app = new mc.Mclist($("#"+mc.main_list_id))
)
