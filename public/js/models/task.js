window.Task = Backbone.Model.extend({
	
	initialize: function(options){
		if (this.attributes.type == undefined) {this.attributes.type = 'normal'}

		this.tasklist = new window.TaskList();
		this.tasklist.parent = this;

		this.view = new window.TaskView({model: this});
		this.view.render();
	},
	
	change: function(){
		
	},
	
	delete: function(){
		console.log ('delete');
		this.collection.remove(this);
		$(this.view.$el).remove();
	},
	
	lock: function(){
		
	}
	
});