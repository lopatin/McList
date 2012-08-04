window.KeyListener = Backbone.Model.extend({
	
	initialize: function(){
		console.log ('init');
	},
	
	keystroke: function(key){
		if (String.fromCharCode(key.keyCode) != ""){
			if (key.shiftKey) { // shiftkey is pressed
				console.log (String.fromCharCode(key.keyCode));			
			} else { // shiftkey is not pressed
				console.log (String.fromCharCode(key.keyCode).toLowerCase());
			}
		}
		console.log (key.shiftKey);
		console.log (key);
	}
	
});