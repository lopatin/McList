var express = require('express'),
	app = express.createServer(),
	redis = require('redis'),
	RedisStore = require('connect-redis')(express),
	sessionStore = new RedisStore(),
	io = require('socket.io').listen(app);

app.listen(3333);

io.sockets.on('connection', function(socket){



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

app.get('/', function(req, res){
	res.send('testing the index action');
});