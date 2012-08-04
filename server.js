var express = require('express'),
	app = express.createServer();

app.listen(3333);

app.get('/', function(req, res){
	res.send('hi');
});