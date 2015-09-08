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

eradikalApp.controller('viewCtrl', ['$scope', '$element', '$window', '$location', function($scope,$element,$window,$location) {
    $scope.$on('$viewContentLoaded', function() {
        $window.ga('send', 'pageview', { page: $location.url() });
    });
    $scope.$on('$routeChangeStart', function(){
        $element.addClass('loading');
    });
    $scope.$on('$routeChangeSuccess', function(){
        setTimeout(function(){
            $element.removeClass('loading');
        },600);
    });
}]);

eradikalApp.controller('band', ['$scope', '$http', function($scope,$http) {
    $http.get('data/band.json')
        .then(function(response){
            $scope.data = response.data;
        },function(response){

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

eradikalApp.controller('videos', ['$scope', '$http', '$sce', function($scope,$http,$sce) {
    var baseUrl = 'http://www.youtube.com/embed/';
    $http.get('data/videos.json')
        .then(function(response){
            response.data.forEach(function(v){
                v.url = $sce.trustAsResourceUrl(baseUrl+v.id);
            });
            $scope.data = response.data;
        },function(response){

        });
}]);

eradikalApp.controller('shows', ['$scope', '$http', function($scope,$http) {
    $scope.data = {};
    $http.get('data/shows.json')
        .then(function(response){
            $scope.data.imgs = response.data;
        },function(response){

        });

    $http({method: 'jsonp', url: 'http://api.bandsintown.com/artists/EradikalInsane/events.json?api_version=2.0&app_id=ei2015&date=all&callback=JSON_CALLBACK'})
        .then(function(response){
            var rawData = response.data,
                currentDate = new Date(),
                isUpcoming = false,
                arrPast = [],
                arrUpcoming = [],
                arrCurrent = arrPast,
                methodCurrent = 'unshift';

            for(var i = 0, lgth = rawData.length; i < lgth; i++){
                var show = rawData[i];
                if(!isUpcoming && new Date(show.datetime) > currentDate){
                    isUpcoming = true;
                    arrCurrent = arrUpcoming;
                    methodCurrent = 'push';
                }
                arrCurrent[methodCurrent](show);
            }

            $scope.data.shows = {
                past:arrPast,
                upcoming:arrUpcoming
            };
        },function(response){

        });
}]);

eradikalApp.controller('reviews', ['$scope', '$http', function($scope,$http) {
    $http.get('data/reviews.json')
        .then(function(response){
            $scope.data = response.data;
        },function(response){

        });
}]);

eradikalApp.controller('contact', ['$scope', '$http', function($scope,$http) {
    $http.get('data/contact.json')
        .then(function(response){
            $scope.data = response.data;
        },function(response){

        });
}]);

eradikalApp.controller('links', ['$scope', '$http', function($scope,$http) {
    $http.get('data/links.json')
        .then(function(response){
            $scope.data = response.data;
        },function(response){

        });
}]);

eradikalApp.controller('home', ['$scope', '$http', function($scope,$http) {
    var enteredAndClicked = false;
    $scope.data = {};
    $scope.flipped = false;

    $scope.flipImage = function(str){
        switch (str){
            case 'enter' :
                enteredAndClicked = false;
                $scope.flipped = true;
                break;

            case 'leave' :
                $scope.flipped = false;
                break;

            case 'click' :
                if(!enteredAndClicked) enteredAndClicked = true;
                else $scope.flipped = !$scope.flipped;
                break;
        }
    };

    $http.get('data/home.json')
        .then(function(response){
            $scope.data.imgs = response.data;
        },function(response){

        });

    twitterFetcher.fetch({
        id : '447793679625764864',
        dataOnly:true,
        customCallback : function(tweets){
            $scope.data.tweets = tweets;
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
        .when('/band', {
            templateUrl: 'partials/band.html',
            controller: 'band'
        })
        .when('/shows', {
            templateUrl: 'partials/shows.html',
            controller: 'shows'
        })
        .when('/videos', {
            templateUrl: 'partials/videos.html',
            controller: 'videos'
        })
        .when('/shop', {
            templateUrl: 'partials/shop.html',
            controller: 'shop'
        })
        .when('/reviews', {
            templateUrl: 'partials/reviews.html',
            controller: 'reviews'
        })
        .when('/contact', {
            templateUrl: 'partials/contact.html',
            controller: 'contact'
        })
        .when('/links', {
            templateUrl: 'partials/links.html',
            controller: 'links'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);
