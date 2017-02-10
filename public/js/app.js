angular.module('gomoku',['ui.router'])

.config( function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('chat', {
      url:'/',
      templateUrl: '../views/chatroom.html',
      controller: "landingCtrl"
    })
      .state('game', {
        url:'/game',
        templateUrl: '../views/game.html',
        controller: "gameCtrl"
      })
    $urlRouterProvider.otherwise('/')
  }
)
