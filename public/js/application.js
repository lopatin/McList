tpl.loadTemplates(['task'], function(){
	window.appRouter = new window.AppRouter();
	console.log ("hul igennem");
	
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
	window.task = new window.Task({
		taskname: 'main',
		type: 'top'
	});
	$("#tasklist").append(window.task.view.$el);

	window.masterCursor = new window.Cursor({
		position: window.task
	});
	window.cursorList = new window.CursorList();
	window.cursorList.add (window.masterCursor);
});
