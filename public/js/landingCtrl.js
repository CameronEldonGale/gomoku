angular.module('gomoku').controller('landingCtrl', function($scope,$state,$rootScope){
  $scope.enter = function(name) {
    if (!name) {
      alert('need a name')
      return
    }
    $rootScope.enter(name)
    $state.go('game')
  }
})
