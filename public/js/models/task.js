window.Task = Backbone.Model.extend({
	
	initialize: function(options){
		if (this.attributes.type == undefined) {this.attributes.type = 'normal'}

		this.tasklist = new window.TaskList();
		this.tasklist.parent = this;

		this.view = new window.TaskView({model: this});
		this.view.render();

		this.on("change", function(){
			this.view.render();
			console.log ('change');
		});
	},
	
	change: function(){
		
	},
	
	delete: function(){
		
	},
	
	lock: function(){
		
	}
	
});