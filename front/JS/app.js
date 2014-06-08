var app = angular.module('App', ['ngRoute', 'ngAnimate', 'ngSanitize', 'route-segment', 'view-segment', 'MainConfig'])
.value('loader', {show: false})

function MainCtrl($scope, $routeSegment, loader) {
  $scope.$routeSegment = $routeSegment;
  $scope.loader = loader;
  $scope.$on('routeSegmentChange', function() {
    loader.show = false;
  });
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
