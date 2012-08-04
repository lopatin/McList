window.KeyListener = Backbone.Model.extend({
	
	initialize: function(){
		console.log ('init');
		this.active = true;
		this.strokes = new window.StrokeList();
	},
	
	keypress: function(key){
		if (this.active){	
			this.strokes.add (key);
			return false;
		}
	},
	
	keyup: function(key){
		if (this.active){
			this.strokes.add (key);
			return false;
		}
	}
	
});