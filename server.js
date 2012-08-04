var	fs 				= require('fs'),
	_cookie  		= require('cookie'),
	express 		= require('express'),
	RedisStore 		= require('connect-redis')(express),
	sessionStore 	= new RedisStore(),
	_ 				= require('underscore'),
	_redis 			= require('redis'),
	redis 			= _redis.createClient(),
	app 			= express.createServer(),
	async			= require('async'),
	io 				= require('socket.io').listen(app);


function Tree(){
	this.master = new Task();
	var count = 0;

	this.addTask = function(parent_id){
		count++;
		this.master.insertNew(parent_id, count);
	}

	this.deleteTask = function(id){
		this.master.deleteTask(id);
	}

}

function Task(id){
	this.children = [];
	this.text = "";
	this.id = id;

	this.insertNew = function(parent_id, new_id){
		if(this.id == parent_id) this.children.push(new Task(new_id));
		_.each(this.children, function(child){
			child.insertNew(parent_id, new_id);
		});
	};

	this.deleteTask = function(id){
		this.children = _.filter(this.children, function(child){
			return child.id != id;
		});

		_.each(this.children, function(child){
			child.deleteTask();
		});
	};

	this.updateTask = function(task_id, text){
		if(this.id == task_id) this.text = text;
		_.each(this.children, function(child){
			child.updateTask(task_id, text);
		});
	};
}


/*
 * Configure the express.js server
 */
app.configure(function(){
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({
		secret: "PeopleLoveLists",
		store: sessionStore
	}));
});


/*
 * Get sessions working with socket.io
 */
io.configure(function() {
    io.set('authorization', function(data, callback) {
        if (data.headers.cookie) {
            var cookie = _cookie.parse(data.headers.cookie);
            sessionStore.get(cookie['connect.sid'], function(err, session) {
            	console.log("FROM SOCKET AUTH: "+session.clientId);
                if (err || !session) {
                    callback('Error', false);
                } else {
                    data.session = session;
                    callback(null, true);
                }
            });
        } else {
            callback('No cookie', false);
        }
    });
});

var tree = new Tree();


/*
 * Most app logic (socket communication)
 */
io.sockets.on('connection', function(socket){
	console.log("FROM SOCKET: "+socket.handshake.session.clientId);
	var session = socket.handshake.session;

	// Initialize redis pub sub client for this socket. Keep this at the top
	socket.pubsub = _redis.createClient();



	socket.on('emit_to_all', function(data, fn){
		socket.broadcast.emit('emit-to-all', data);
		fn();
	});

	socket.on('add_task', function(parent_id, fn){
		tree.addTask(parent_id);
		socket.broadcast.emit('added_task');
		fn();
	});

	socket.on('delete_task', function(id, fn){
		tree.deleteTask(id);
		socket.broadcast.emit('deleted_task');
		fn();
	});

	socket.on('update_task', function(data, fn){
		tree.updateTask(data.task_id, data.text);
		socket.broadcast.emit('updated_task');
		fn();
	});



	subscribeToTasks(socket);

	/*
	 * socket represents an open socket connection with one browser
	 */
	socket.emit('initial-info', {
		user_id: session.clientId,
		main_task: results.last_main_task
	});

	/*
	 * How to use socket io
	 */
	socket.on('test', function(data){
		console.log(data);
	});
	socket.emit('test-event', {
		testdata: 'test'
	}, function(response){
		console.log('response from client');
	});
	socket.on('incoming-event', function(data){
		console.log(data.someMessage);
	});

});

/*
 * Subscribe the client its main task
 * 	TODO: Subscribe to all sub tasks too
 */
function subscribeToTasks(socket){
	socket.on('message', function(channel, message){
		socket.emit();
	});

	socket.pubsub.on('subscribe', function(channel, count){
		console.log("SUBSCRIBED TO " + channel + " BY " + socket.handshake.session.clientId);
	});

	socket.pubsub.subscribe('commands:task:'+socket.handshake.session.mainTaskId);
}

/*
 * Render a new list (for now)
 */
app.get('/', function(req, res){
	redis.incr('task-id');
	redis.get('task-id', function(err, new_task_id){

		// If user is coming back
		if(!(req.session && req.session.clientId)){
			redis.incr('user_id');
			redis.get('user_id', function(err, new_user_id){
				req.session.clientId = new_user_id;
				renderIndex(req, res, new_task_id);
			});
		} 

		// If new user
		else renderIndex(req, res, new_task_id);
	});
});

/*
 * Render an existing list when visiting its URL
 */
app.get('/list/:task_id', function(req, res){

	renderIndex();
});

/*
 * Render the main page
 */
function renderIndex(req, res, task_id){
	req.session.mainTaskId = task_id;
	console.log("CLIENT ID FROM EXPRESS: "+req.session.clientId);
	console.log("TASK ID FROM EXPRESS: "+req.session.mainTaskId);

	fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
}


app.use(express.static(__dirname + '/public'));

app.listen(3333);
