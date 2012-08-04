var StrokeList = Backbone.Collection.extend({
	
	model: window.KeyStroke,
	keymap: {
		16: 'shiftKey',
		17: 'ctrlKey',
		18: 'altKey'
	},
	
	initialize: function(){
		this.on ('add', function(element){
			if (element.attributes.type == 'keyup'){
				switch (element.attributes.which){
					case 16:
					case 17:
					case 18:
						// ignoring alt, ctrl, shift keys
						if (this.models[this.models.length - 2].attributes[this.keymap[element.attributes.which]]){
							// timeDiff is the difference between the last two key events that have been recorded
							var timeDiff=	this.models[this.models.length - 1].attributes.timeStamp
										  -	this.models[this.models.length - 2].attributes.timeStamp;
							if (timeDiff < 100){
								this.remove(element);
							} else {
								console.log (timeDiff);
							}
						} else {
							console.log ('1');
						}

						console.log (this.keymap[element.attributes.which]);
					break;
					
					case 91:
					case 93:
						// cmd keys
						console.log ('cmd keys');
					break;
					// arrow keys
					case 37:
						console.log ('left');
					break;
					case 38:
						console.log ('up');
					break;
					case 39:
						console.log ('right');
					break;
					case 40:
						console.log ('down');
					break;
					default:
						this.remove(element);
					break;
				}
			} else if (element.attributes.type == 'keypress'){
				console.log (element.attributes);
			}
		});
	}
	
	
});