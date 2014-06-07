var app = angular.module('App', ['ngRoute', 'ngAnimate', 'ngSanitize', 'route-segment', 'view-segment', 'MainConfig'])
.value('loader', {show: false})


function MainCtrl($scope, $routeSegment, loader) {
    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;
    $scope.$on('routeSegmentChange', function() {
        loader.show = false;
    });
    var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          disableDefaultUI: true

        };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

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
