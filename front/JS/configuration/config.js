angular.module('MainConfig', []).config(function($sceDelegateProvider, $routeSegmentProvider, $routeProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
       'self',
       'http://*.youtube.com/**'
       ]);
    $sceDelegateProvider.resourceUrlBlacklist([
        'http://thisistheblacklist.cm'
        ]);
    $routeSegmentProvider.options.autoLoadTemplates = true;
    $routeSegmentProvider

    .when('/app', 'nav.menu.detail')
    .segment('nav', {
        templateUrl: 'VIEW/nav.html',
        controller: 'NavCtrl'
    })
    .within()
    .segment('menu', {
        templateUrl: 'VIEW/menu.html',
        controller: 'MenuCtrl'
    })
    .within()
    .segment('detail', {
        templateUrl: 'VIEW/detail.html',
        controller: 'DetailCtrl'
    })
    .up()
    .up()
    $routeProvider.otherwise({redirectTo: '/app'}); 
});