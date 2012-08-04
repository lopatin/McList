var CursorList = Backbone.Collection.extend({
	
	initialize: function(){
		var that = this;
		this.renderAll();
		this.on ('add', function(element){
			element.attributes.color = 'aqua';
			that.renderAll();
		});
	},
	
	renderAll: function(){
		$("#tasklist h3").css({
			"background-color": "white"
		});
		for (index in this.models){
			this.models[index].view.render();
		}
	}
	
});