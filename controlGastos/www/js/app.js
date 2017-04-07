// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var controlGastosModule = angular.module('starter',
  ['ionic', 'starter.controllers', 'ion-floating-menu',
   'ui.utils.masks', 'ion-datetime-picker','angularMoment', 'starter.services']);
var controladoresModule = angular.module('starter.controllers', ['starter.services']);


controlGastosModule.run(function($ionicPlatform, movimientosService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    movimientosService.inicializar().then(function(data){
      if(!data)
        $scope.estadoError = true;
      // else {
      //   $scope.$broadcast('creacionBase');
      // }
    }, function(err){
        $scope.estadoError = true;
    });
  });
});
