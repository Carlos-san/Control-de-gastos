modulo.config(config);

function config($stateProvider, $urlRouterProvider) {
    //Manejo de rutas
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
        .state('app.actividad', {
            url: "/actividades",
            views: {
                'menu-content': {
                    templateUrl: "templates/agregar-actividad.html",
                    controller: 'ActividadCtrl'
                }
            }
        })
        .state('app.entrada', {
            url: "/entradas",
            views: {
                'menu-content': {
                    templateUrl: "templates/agregar-entrada.html",
                    controller: 'EntradaCtrl'
                }
            }
        })
        .state('app.salida', {
            url: "/salidas",
            views: {
                'menu-content': {
                    templateUrl: "templates/agregar-salida.html",
                    controller: 'SalidaCtrl'
                }
            }
        })
        .state('app.hmovimientos', {
            url: "/hmovimientos",
            views: {
                'menu-content': {
                    templateUrl: "templates/historico-movimientos.html",
                    controller: 'HistoricoCtrl'
                }
            }
        })
        .state('app.resumen', {
            url: "/resumen",
            views: {
                'menu-content': {
                    templateUrl: "templates/resumen-Bases.html",
                    controller: 'resumenBasesController'
                }
            }
        })
        ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dash');
}
