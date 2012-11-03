#
# Main Mclist Applciation
#

mc = McList

class mc.Mclist
	constructor: ->
		@list = new mc.List(true)
		mc.Commander.init()

#
# Run the app 
#

$( ->
	mc.app = new mc.Mclist()
)
