tpl.loadTemplates(['task', 'taskedit'], function(){
	window.appRouter = new window.AppRouter();
	console.log ("hul igennem");
	
	window.masterCursor = new window.Cursor();
	window.keyListener = new window.KeyListener();
	$('body')
		.keypress (function(event){
			window.keyListener.keypress(event);
		})
		.keyup (function(event){
			window.keyListener.keyup(event);
		});
		
	window.socket = window.io.connect("statsonstats.com:3333");
	window.socket.on ("test",
		function(resp){
			console.log (resp);
		}
	);
});
