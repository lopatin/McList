var express = require('express'),
	app = express.createServer(),
	_cookie = require('cookie'),
	io = require('socket.io').listen(app),
	RedisStore = require('connect-redis')(express),
	sessionStore = new RedisStore(),
	_ =	require('underscore');

/*
 * Configure the express.js server
 */
app.configure(function(){
	app.set('views', __dirname);
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({
		secret: "PeopleLoveLists",
		store: sessionStore
	}));
	app.use(express.static(__dirname + '/public'));
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
            var cookie = _cookie.parse(data.headers.cookie);
            sessionStore.get(cookie['connect.sid'], function(err, session) {
            	console.log("FROM SOCKET AUTH: "+session.myVar);
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

var count = 0;

/*
 * Most app logic (socket communication)
 */
io.sockets.on('connection', function(socket){
	console.log("FROM SOCKET: "+socket.handshake.session.myVar);

	/*
	 * socket represents an open socket connection with one browser
	 */
	socket.emit('user-info', {
		session: null
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

	count++;
});

app.get('/myindex.html', function(req, res){
	console.log("FROM EXPRESS: "+req.session.myVar);
	res.send('hi');
});

