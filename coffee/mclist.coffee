#
# Main Mclist Applciation
#

mc = McList

class mc.Mclist
	constructor: ->
		@list = new mc.List()


#
# Run the app 
#

mc.app = new mc.Mclist