var app = angular.module('App', ['ngRoute', 'ngAnimate', 'ngSanitize', 'route-segment', 'view-segment', 'MainConfig'])
.value('loader', {show: false})

function updatePosition () {
    var divPosition = this.y>>0;
    //if (divPosition == -100) {
    //    alert('sssss');
    //}
}
function MainCtrl($scope, $routeSegment, loader) {
    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;
    $scope.$on('routeSegmentChange', function() {
        loader.show = false;
    });
    var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8
        };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    var NavScroll;
    var MenuScroll;
    var DetailScroll;
    document.addEventListener('touchmove', function (e) { 
        e.preventDefault(); 
    }, false);
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
        MenuScroll = new IScroll('#MenuWrapper', { scrollX: false, scrollY: true, mouseWheel: true
        });
        MenuScroll.on('scroll', updatePosition);
    });
}
function DetailCtrl($scope, $routeSegment, $http) {
    $scope.$routeSegment = $routeSegment;
    $scope.$on('routeSegmentChange', function() {
        DetailScroll = new IScroll('#DetailWrapper', { scrollX: false, scrollY: true, mouseWheel: true
        });
    });
}
