var eradikalApp = angular.module('eradikalApp',['ngSanitize','ngRoute']);

eradikalApp.controller('navCtrl', ['$scope', function($scope) {
    $scope.btNav = function(e){
        e.stopPropagation();
        $scope.navOpen = !$scope.navOpen;
    };
}]);

eradikalApp.controller('playCtrl', ['$scope', '$http', function($scope,$http) {
    $scope.btPlay = function(){
        /*if(!$scope.iframeSrc) {
            $scope.iframeSrc = 'http://bandcamp.com/EmbeddedPlayer/album=3078173212/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/';
        }*/
        $scope.playOpen = !$scope.playOpen;
    };
}]);

eradikalApp.controller('viewCtrl', ['$scope', '$element', function($scope,$element) {
    $scope.$on('$routeChangeStart', function(){
        $element.addClass('loading');
    });
    $scope.$on('$routeChangeSuccess', function(){
        setTimeout(function(){
            $element.removeClass('loading');
        },600);
    });
}]);

eradikalApp.controller('shop', ['$scope', '$http', function($scope,$http) {
    $scope.baseUrl = 'http://eradikalinsane.bigcartel.com';
    $http.get('http://api.bigcartel.com/eradikalinsane/products.json')
        .then(function(response){
            $scope.data = response.data;
        },function(response){

        });
}]);

eradikalApp.controller('shows', ['$scope', '$http', function($scope,$http) {
    $http({method: 'jsonp', url: 'http://api.bandsintown.com/artists/EradikalInsane/events.json?api_version=2.0&app_id=ei2015&callback=JSON_CALLBACK'})
        .then(function(response){
            $scope.data = response.data;
        },function(response){

        });
}]);

eradikalApp.controller('home', ['$scope', function($scope) {
    twitterFetcher.fetch({
        id : '447793679625764864',
        dataOnly:true,
        customCallback : function(tweets){
            $scope.data = tweets;
            $scope.$apply();
        }
    });
}]);

eradikalApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'home'
        })
        .when('/shows', {
            templateUrl: 'partials/shows.html',
            controller: 'shows'
        })
        .when('/shop', {
            templateUrl: 'partials/shop.html',
            controller: 'shop'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);
