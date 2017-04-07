controlGastosModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.test', {
    url: '/test',
    views: {
      'menuContent': {
        templateUrl: 'templates/test.html',
        controller: 'TestCtrl'
      }
    }
  })
  .state('app.detalle-actividad', {
    url: '/detalle-actividad/:id',
    views: {
      'menuContent': {
        url: '/',
        templateUrl: 'templates/directive/detalle-actividad.html',
        controller: 'ActividadesCtrl'
      }
    }
  })
  ;

  $urlRouterProvider.otherwise('/app/test');
});
