window.TaskList = Backbone.Collection.extend({
	
	model: window.Task,
	
	initialize: function(){
		var that = this;
		
		this.on('add', function(element){

		});
		this.on('remove', function(element){
			console.log (element);
		});
	}
		
});