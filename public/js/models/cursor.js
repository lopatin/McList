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
		
	},
	up: function(){
		// index holds where the task is in the list
		var index = $.inArray(this.get('position'), this.attributes.position.collection.models);

		console.log (index);
		switch (index){
			case -1:
				// error - task is not in index
				console.log ('error');
			break;
			case 0:
				// first element. Moving up a level
				this.set ({
					position: this.attributes.position.collection.parent
				});
			break;
			default:
				// not first element. Moving up a task
				this.set ({
					position: this.attributes.position.collection.models[index-1]
				});
			break;
		}
	},
	right: function(){
		
	},
	down: function(){
		console.log ('down');
		// index holds where the task is in the list
		var index = $.inArray(this.get('position'), this.attributes.position.collection.models);

		console.log (index);
		switch (index){
			case -1:
				// error - task is not in index
				console.log ('error');
			break;
			case this.attributes.position.collection.models.length:
				// last element. Moving down

			break;
			default:
				// not first element. Moving up a task
				console.log (this.attributes.position.collection);

/*				this.set ({
					position: this.attributes.position.collection.models[index+1]
				});
*/			break;
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
	
	open: function(){
		
	},
	close: function(){
		
	}
	
});