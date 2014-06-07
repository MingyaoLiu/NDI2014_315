var app = angular.module('App', ['ngRoute', 'ngAnimate', 'ngSanitize', 'route-segment', 'view-segment', 'MainConfig'])
.value('loader', {show: false})


function MainCtrl($scope, $routeSegment, loader) {
    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;
    $scope.$on('routeSegmentChange', function() {
        loader.show = false;
    });
    var mapOptions = {
          center: new google.maps.LatLng(17.7850,-12.4183),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true

        };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);

    //Setup heat map and link to Twitter array we will append data to
  var heatmap;
  var liveTweets = new google.maps.MVCArray();
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: liveTweets,
    radius: 25
  });
  heatmap.setMap(map);

  if(io !== undefined) {
    // Storage for WebSocket connections
    var socket = io.connect('/');

    // This listens on the "twitter-steam" channel and data is 
    // received everytime a new tweet is receieved.
    socket.on('twitter-stream', function (data) {

      //Add tweet to the heat map array.
      var tweetLocation = new google.maps.LatLng(data.lng,data.lat);
      liveTweets.push(tweetLocation);

      //Flash a dot onto the map quickly
      var image = "/ASSET/small-dot-icon.png";
      var marker = new google.maps.Marker({
        position: tweetLocation,
        map: map,
        icon: image
      });
      setTimeout(function(){
        marker.setMap(null);
      },600);

    });

    // Listens for a success response from the server to 
    // say the connection was successful.
    socket.on("connected", function(r) {

      //Now that we are connected to the server let's tell 
      //the server we are ready to start receiving tweets.
      socket.emit("start tweets");
    });
  }
}
function NavCtrl($scope, $routeSegment, loader) {
    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;
    $scope.$on('routeSegmentChange', function() {
        loader.show = false;
    });
}
function MenuCtrl($scope, $routeSegment) {
    $scope.$routeSegment = $routeSegment;
    $scope.$on('routeSegmentChange', function() {
    });
}
function DetailCtrl($scope, $routeSegment, $http) {
    $scope.$routeSegment = $routeSegment;
    $scope.$on('routeSegmentChange', function() {
    });
}
