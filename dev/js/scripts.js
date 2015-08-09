var eradikalApp = angular.module('eradikalApp',['ngRoute']);

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

eradikalApp.controller('page1', ['$scope', '$http', function($scope,$http) {
    $http.get('data/page1.json')
        .then(function(response){
            console.log(response);
            $scope.data = response.data;
        },function(response){

        });
}]);


eradikalApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/test', {
            templateUrl: 'partials/test.html',
            controller: 'page1'
        })
        .when('/test2', {
            templateUrl: 'partials/test2.html'
        })
        .otherwise({
            redirectTo: '/test'
        });

}]);
