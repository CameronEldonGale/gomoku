angular.module('gomoku').controller('socketCtrl', function($scope, $rootScope){
  $scope.test = 'hello world'
   var socket = io.connect();

   $rootScope.send = function(text){
     socket.emit('chat', text)
   }

   $rootScope.enter = function(name){
     socket.emit('enter', name)
    
   }

    $scope.messages=[];

   socket.on('hey', function(msg){
     console.log(msg);
     $scope.messages.push(msg)
     $scope.$digest()
   })


})
