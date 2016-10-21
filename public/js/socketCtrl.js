angular.module('gomoku').controller('socketCtrl', function($scope){
  $scope.test = 'hello world'
   var socket = io.connect();

   $scope.send = function(text){
     socket.emit('test', text)
     $scope.text = '';
   }
    $scope.messages=[];

   socket.on('hey', function(msg){
     $scope.messages.push(msg)
     $scope.$digest()
   })


})
