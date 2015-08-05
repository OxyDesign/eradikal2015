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


eradikalApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/test', {
            templateUrl: 'partials/test.html'
        }).when('/test2', {
            templateUrl: 'partials/test2.html'
        }).otherwise({
            redirectTo: '/test'
        });

}]);
