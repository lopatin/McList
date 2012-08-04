var express = require('express'),
	app = express.createServer(),
	io = require('socket.io').listen(app),
	RedisStore = require('connect-redis')(express),
	sessionStore = new RedisStore(),
	_ =	require('underscore');

/*
 * Configure the express.js server
 */
app.configure(function(){
	app.set('views', __dirname);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(express.cookieParser());
	app.use(express.session({
		secret: "PeopleLoveLists",
		store: sessionStore
	}));
});

/*
 * Underscore templates
 */
app.register('.html', {
  compile: function(str, options){
    var compiled = require('underscore').template(str);
    return function(locals) {
        return compiled(locals);
    };
  }
});

/*
 * Get sessions working with socket.io
 */
io.configure(function() {
    io.set('authorization', function(data, callback) {
        if (data.headers.cookie) {
            var cookie = parseCookie(data.headers.cookie);
            sessionStore.get(cookie['connect.sid'], function(err, session) {
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

app.listen(3333);

/*
 * Most app logic (socket communication)
 */
io.sockets.on('connection', function(socket){
	var session = socket.handshake.session;

	/*
	 * socket represents an open socket connection with one browser
	 */
	socket.emit('user-info', {
		session: session
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

