mc = McList

class mc.CharNode
	constructor: (@character) ->
    	@next = @prev = null

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

    deleteNode: (node) ->
        if @next is not null
            temp = @next
            temp.prev = @prev
            temp = @prev
            temp.next = @next
            @next = @prev = null
        else
            temp = @prev
            @prev = temp.next = null
        temp
