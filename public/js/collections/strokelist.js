var StrokeList = Backbone.Collection.extend({
	
	model: window.KeyStroke,
	keymap: {
		16: 'shiftKey',
		17: 'ctrlKey',
		18: 'altKey',
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	},
	commandMap: {
		'i': { action: 'insert' },
		'a': { action: 'insert' },
		'e': { action: 'edit' },
		'd': { 
				d: { action: 'delete' }
			},
//		'o': { action: 'newLine' },
		'k': { action: 'up' },
		'j': { action: 'down' },
		'l': { action: 'right' },
		'h': { action: 'left' }
	},
	
	initialize: function(){
		var that = this;
		this.view = new StrokeListView({model: that});
		this.on ('add', function(element){
			if (element.attributes.type == 'keyup'){
				switch (element.attributes.which){
					case 16: case 17: case 18:
						// ignoring alt, ctrl, shift keys
						if (this.models.length > 1){						
							if (this.models[this.models.length - 2].attributes[this.keymap[element.attributes.which]]){
								// timeDiff is the difference between the last two key events that have been recorded
								var timeDiff=	this.models[this.models.length - 1].attributes.timeStamp
											  -	this.models[this.models.length - 2].attributes.timeStamp;
								if (timeDiff < 100){
									this.remove(element);
								} else {
									console.log (timeDiff);
								}
							}
						}
						console.log (this.keymap[element.attributes.which]);
					break;
					
					case 91: case 93:
						// cmd keys
						console.log ('cmd keys');
					break;
					// arrow keys
					case 37: case 38: case 39: case 40:
			//			console.log (this.keymap[element.attributes.which]);
					break;
					default:
						this.remove(element);
					break;
				}
			} else if (element.attributes.type == 'keypress'){
				
			}
			
			this.path = this.commandMap;
			for (index in this.models){
				var charData = this.models[index].attributes;
				if (charData.type == 'keypress' && this.path[String.fromCharCode(charData.charCode)] == undefined){
					// exiting
					index = this.models.length;
					console.log ('flushing');
					this.reset();
					this.view.render();
				} else {
					// climbing further in the tree or performing a command
					var action;
					if (charData.type == 'keyup'){
						// keyup type events
						action = this.keymap[charData.keyCode];
					} else if (charData.type == 'keypress'){
						// keypress type events
						action = String.fromCharCode(charData.keyCode);
					}
				
					if (action != undefined){
						if (this.path[action] != undefined){
							// the path is defined
							if (this.path[action].action != undefined){
								// doing
								window.masterCursor[this.path[action].action]();
								$(this.view.$el).html(this.path[action].action);
								this.reset();
							} else {
								// waiting

								this.path = this.path[action];
								this.view.render();
							}
						} else {
							if (window.masterCursor[action] != undefined){
								window.masterCursor[action]();
								this.reset();
								$(this.view.$el).html(action);
							}
						}
					} else {
						// no path
						this.reset();
						this.view.render();
					}
				}
			}
		});
	}
	
	
});