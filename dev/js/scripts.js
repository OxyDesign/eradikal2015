var eradikalApp = angular.module('eradikalApp',[]);

eradikalApp.controller('navCtrl', ['$scope', function($scope) {
    $scope.btNav = function(){
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

