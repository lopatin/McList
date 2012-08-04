var StrokeListView = Backbone.View.extend({

	initialize: function (){
		this.$el = $("#left")[0];
	}, 
	
	render: function (){
		$(this.$el).html("");
		
		for (index in this.model.models){
			$(this.$el).append(String.fromCharCode(this.model.models[index].attributes.charCode) + " ");
		}
	}

});