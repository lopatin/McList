window.KeyListener = Backbone.Model.extend({
	
	initialize: function(){
		console.log ('init');
		this.strokes = new window.StrokeList();
	},
	
	keypress: function(key){
		if (key.shiftKey) { // shiftkey is pressed
	//		console.log (String.fromCharCode(key.keyCode));			
		} else { // shiftkey is not pressed
	//		console.log (String.fromCharCode(key.keyCode).toLowerCase());
		}
		this.strokes.add (key);
	},
	
	keyup: function(key){
		this.strokes.add (key);
//		console.log (key);
	}
	
});