var CursorView = Backbone.View.extend({
	
	initialize: function(){
		
	},
	
	render: function(){
		$(this.model.attributes.position.view.$('.taskname')[0]).css({
			'background-color': this.model.get('color')
		});
		console.log (this.model.attributes.position);
	}
	
});