var http = require('http');
var express = require('express');
var app = express();
var router = express.Router(); 
var bodyParser = require('body-parser');
var twitter = require('twitter');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//Setup twitter stream api
var twit = new twitter({
  consumer_key: 'fUMpAUeIPU8znJzicRCbn9MLt',
  consumer_secret: 'nGN7sWQzYyyqx8VleuiHLLhlUaCAdbfxcU4BdPx27y0IIup3v3',
  access_token_key: '743568692-UfbmZfbmoP1mcIAoTiiIRRczSVxFRxt6e0YXbv1A',
  access_token_secret: 'pa6TKUuNbCmaLdJitPKt7y67I8fmKsbM0UuFG2fE1uC0f'
});
var port = process.env.PORT || 8081;
stream = null;
//Use the default port (for beanstalk) or default to 8081 locally
server.listen(port);







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

console.log('website is running @ port ' + port);





//Create web sockets connection.
io.sockets.on('connection', function (socket) {

  socket.on("start tweets", function() {

    if(stream === null) {
      //Connect to twitter stream passing in filter for entire world.
      twit.stream('statuses/filter', {'locations':'-80,43.3,-78,44.5'}, function(stream) {
          stream.on('data', function(data) {
              // Does the JSON result have coordinates
              if (data.coordinates){
                if (data.coordinates !== null){
                  //If so then build up some nice json and send out to web sockets
                  var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]};

                  socket.broadcast.emit("twitter-stream", outputPoint);

                  //Send out to web sockets channel.
                  socket.emit('twitter-stream', outputPoint);
                }
                else if(data.place){
                  if(data.place.bounding_box === 'Polygon'){
                    // Calculate the center of the bounding box for the tweet
                    var coord, _i, _len;
                    var centerLat = 0;
                    var centerLng = 0;

                    for (_i = 0, _len = coords.length; _i < _len; _i++) {
                      coord = coords[_i];
                      centerLat += coord[0];
                      centerLng += coord[1];
                    }
                    centerLat = centerLat / coords.length;
                    centerLng = centerLng / coords.length;

                    // Build json object and broadcast it
                    var outputPoint = {"lat": centerLat,"lng": centerLng};
                    socket.broadcast.emit("twitter-stream", outputPoint);

                  }
                }
              }
              stream.on('limit', function(limitMessage) {
                return console.log(limitMessage);
              });

              stream.on('warning', function(warning) {
                return console.log(warning);
              });

              stream.on('disconnect', function(disconnectMessage) {
                return console.log(disconnectMessage);
              });
          });
      });
    }
  });

    // Emits signal to the client telling them that the
    // they are connected and can start receiving Tweets
    socket.emit("connected");
});









exports = module.exports = app;