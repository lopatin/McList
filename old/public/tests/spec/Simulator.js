var mc = McList;

mc.TaskSimulator = function(){
	this.task = mc.app.list.root_task.last_child.add_task();

	this.run = function(sequence){
		// Turn sequence name into a sequence array of keystrokes
		if(typeof sequence === 'string')
			sequence = mc.TaskSimulator.sequences[sequence];

		// Run all keystrokes of sequence
		for(var i = 0; i < sequence.length; i++)
			press_key(sequence[i]);
	}

	function press_key(key){
		var e = jQuery.Event("keydown");
		e.which = mc.KeyCodeHelper.keyCodeMap_r[key];
		$(document.body).trigger(e);
	}
};

mc.TaskSimulator.sequences = {
	"enter insert mode": ['i'],
	"enter dummy text": "dummy text".split('')
};