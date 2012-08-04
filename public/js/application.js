tpl.loadTemplates(['task', 'taskedit'], function(){
	window.appRouter = new window.AppRouter();
	console.log ("hul igennem");
	
	window.keyListener = new window.KeyListener();
	$('body').keyup(function(event){
		window.keyListener.keystroke(event);
	});
	window.socket = window.io.connect("statsonstats.com:3333");
	window.socket.on ("test",
		function(resp){
			console.log (resp);
		}
	);
});
