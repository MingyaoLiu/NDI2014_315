var http = require('http');
var express = require('express');
var app = express();
var router = express.Router(); 
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
app.use(bodyParser());
router.use(function(req, res, next) {
	console.log('GET/POST happening through API');
	next();
});
router.get('/', function(req, res) {
	res.json({ message: 'Connected to project API' });	
});
app.use('/api', router);

app.use(express.static(__dirname + '/front'));
app.get('/', function(req, res) {
	res.sendfile('index.html');
});
app.listen(port);
console.log('website is running @ port ' + port);

exports = module.exports = app;