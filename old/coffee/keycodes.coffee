# 
# KeyCode Helper Object
# 

mc = McList

mc.KeyCodeHelper = 
	get_key_code: (e) ->
		keycode = null
		if window.event
			keycode = window.event.keyCode
		else if e
			keycode = e.which

		keycode

	get_key_code_value: (keyCode, shiftKey) ->
		value = null
		shiftKey = mc.Commander.shift_mode
		if shiftKey == true
			value = @modifiedByShift[keyCode]
		else
			value = @keyCodeMap[keyCode]
		return value

	#
	# Main function of the helper. Take in an event and return human readable representation of key pressed
	#
	get_key_value: (e) ->
		return @get_key_code_value(@get_key_code e, e.shiftKey)

	keyCodeMap: {
		8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pausebreak", 20:"capslock", 27:"escape", 32:" ", 33:"pageup",
		34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 43:"+", 44:"printscreen", 45:"insert", 46:"delete",
		48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
		61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
		77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
		96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9",
		106: "*", 107:"+", 109:"-", 110:".", 111: "/",
		112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12",
		144:"numlock", 145:"scrolllock", 186:";", 187:"=", 188:",", 189:"-", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
	},

	modifiedByShift: {
		192:"~", 48:")", 49:"!", 50:"@", 51:"#", 52:"$", 53:"%", 54:"^", 55:"&", 56:"*", 57:"(", 109:"_", 61:"+",
		219:"{", 221:"}", 220:"|", 59:":", 222:"\"", 188:"<", 189:">", 191:"?",
		96:"insert", 97:"end", 98:"down", 99:"pagedown", 100:"left", 102:"right", 103:"home", 104:"up", 105:"pageup", 16:"shift", 
		65:"A", 66:"B", 67:"C", 68:"D", 69:"E", 70:"F", 71:"G", 72:"H", 73:"I", 74:"J", 75:"K", 76:"L",
		77:"M", 78:"N", 79:"O", 80:"P", 81:"Q", 82:"R", 83:"S", 84:"T", 85:"U", 86:"V", 87:"W", 88:"X", 89:"Y", 90:"Z",
		13:"shift_return"
	}

mc.KeyCodeHelper.keyCodeMap_r = ( ->
	_.reduce @keyCodeMap, (memo, name, code) -> 
		memo[name] = code
		memo
	, {}
).call mc.KeyCodeHelper