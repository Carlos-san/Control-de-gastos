modulo.config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.dash', {
            url: "/dash",
            views: {
                'menu-content': {
                    templateUrl: "templates/dash-board.html",
                    controller: 'DashCtrl'
                }
            }
        })

        ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dash');
}