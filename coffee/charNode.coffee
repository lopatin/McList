mc = McList

class mc.CharNode
	constructor: (@character) ->
    	@next = null
    	@prev = null

    addAfter: (input) ->
    	_char = new mc.CharNode input

    	if @next is not null
    		temp = @next
    		_char.next = temp
    		@next = _char
    		_char.prev = temp.prev
    		temp.prev = _char
    	else
    		_char.prev = @
    		@next = _char

    	_char





