var	fs 				= require('fs'),
	_cookie  		= require('cookie'),
	express 		= require('express'),
	RedisStore 		= require('connect-redis')(express),
	sessionStore 	= new RedisStore(),
	_ 				= require('underscore'),
	_redis 			= require('redis'),
	redis 			= _redis.createClient(),
	app 			= express.createServer(),
	io 				= require('socket.io').listen(app);

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



/*
 * Most app logic (socket communication)
 */
io.sockets.on('connection', function(socket){
	console.log("FROM SOCKET: "+socket.handshake.session.clientId);
	var session = socket.handshake.session;

	/*
	 * socket represents an open socket connection with one browser
	 */
	socket.emit('user-info', {
		user_id: session.clientId
	});

	socket.on('test', function(data){
		console.log(data);
	});

	/*
	 * How to use socket io
	 */
	socket.emit('test-event', {
		testdata: 'test'
	}, function(response){
		console.log('response from client');
	});

	socket.on('incoming-event', function(data){
		console.log(data.someMessage);
	});

});

var count = 0;

/*
 * Main page render
 */
app.get('/', function(req, res){
	console.log('asdf');
	if(!(req.session && req.session.clientId)){
		req.session.clientId = count;
		count++;
	}

	console.log("FROM EXPRESS: "+req.session.clientId);

	fs.readFile(__dirname + '/public/myindex.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.use(express.static(__dirname + '/public'));

app.listen(3333);
