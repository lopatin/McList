window.Cursor = Backbone.Model.extend({
	
	initialize: function(options){
		var that = this;
		this.view = new window.CursorView({
			model: this
		});
		this.on ('change', function(){
			that.collection.renderAll();
		});
	},
	
	left: function(){
		console.log ('left');
		
		if (this.attributes.position.collection != undefined){		
			this.set({
				position: this.attributes.position.collection.parent
			});
		}
	},
	up: function(){
		console.log ('up');
		// index holds where the task is in the list
		if (this.attributes.position.collection != undefined){
			var index = $.inArray(this.get('position'), this.attributes.position.collection.models);

			console.log (index);
			switch (index){
				case -1:
					// error - task is not in index
					console.log ('error');
				break;
				case 0:
					// first element. Moving up a level
					if (this.attributes.position.collection != undefined){
						this.set ({
							position: this.attributes.position.collection.parent
						});
					}
				break;
				default:
					// not first element. Moving up a task
					this.set ({
						position: this.attributes.position.collection.models[index-1]
					});
				break;
			}
		}
	},
	right: function(){
		console.log ('right');
		
		if (this.attributes.position.tasklist.models.length > 0){
			this.set({
				position: this.attributes.position.tasklist.models[0]
			});
			return true;
		} else {
			return false;
		}
	},
	down: function(){
		console.log ('down');

		if (this.attributes.position.collection == undefined){
			// if there is no collection
			
		} else {
			// ther is a collection
		
			// index holds where the task is in the list
			var index = $.inArray(this.get('position'), this.attributes.position.collection.models);

			console.log (index);
			switch (index){
				case -1:
					// error - task is not in index
					console.log ('error');
				break;
				case this.attributes.position.collection.models.length - 1:
					// last element. Moving down
					console.log ('last');
					this.left();
					this.down();
				break;
				default:
					// not first element. Moving up a task
					console.log (this.attributes.position.collection);

					this.set ({
						position: this.attributes.position.collection.models[index+1]
					});
				break;
			}		
	
		}
	},
	
	insert: function(){
		console.log ('insert');
		var newEl = 
			$(this.attributes.position.tasklist.add({
				taskname: 'new task'
			})
			.models).last()[0];
		$(this.attributes.position.view.$('.tasklist')[0]).append(newEl.view.$el);
		this.set({
			'position': newEl
		});
		this.edit();
	},
	
	delete: function(){
		console.log ('delete');		
	},
	
	newLine: function(){
		console.log ('newLine');
	},
	
	lock: function(){
		
	},	
	unlock: function(){
		
	},
	
	edit: function(){
		window.keyListener.active = false;
		var val = this.attributes.position.view.$('form')[0].elements[0].value;

		$(this.attributes.position.view.$('h3')[0]).css({'display': 'none'});
		$(this.attributes.position.view.$('form')[0]).css({'display': 'block'});

		$(this.attributes.position.view.$('form')[0].elements['taskname']).keypress(function(event){
			console.log (event);
		});
		
		this.attributes.position.view.$('form')[0].elements['taskname'].focus();

		console.log(this.attributes.position.view.$('form')[0].elements[0].value);

		this.attributes.position.view.$('form')[0].elements[0].value = val;

		console.log(this.attributes.position.view.$('form')[0].elements[0].value);

	}
});