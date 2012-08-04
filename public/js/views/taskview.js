window.TaskView = Backbone.View.extend({
	
	initialize: function(){
		
	},
	
	render: function(){
		var template = _.template(tpl.get('task'));
		this.el = template(this.model.attributes);
		this.$el.html (this.el);
	}
	
});