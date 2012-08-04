window.TaskView = Backbone.View.extend({
	
	initialize: function(){
		
	},
	
	render: function(){
		var that = this;
		var template = _.template(tpl.get('task'));
		this.el = template(this.model.attributes);
		this.$el.html (this.el);

		$(this.$('form')[0]).submit(function(){
			that.model.attributes.taskname = that.$('form')[0].elements['taskname'].value;
			$(that.$('h3')[0]).html(that.$('form')[0].elements['taskname'].value);
			
			window.cursorList.renderAll();
			
			window.keyListener.active = true;
			
			that.$('form').css({display: 'none'});
			that.$('h3').css({display: 'block'});
			
			return false;
		});
	}
	
});