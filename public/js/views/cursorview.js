var CursorView = Backbone.View.extend({
	
	initialize: function(){
		
	},
	
	render: function(){
		$(this.model.attributes.position.view.$('h3')[0]).css({
			'background-color': this.model.get('color')
		});
		console.log (this.model.attributes.position);
	}
	
});