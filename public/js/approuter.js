var AppRouter = Backbone.Router.extend({
	routes: {
		"*actions": "navigation"
	},
	
	navigation: function (route) {
		console.log (route);
	}
});