var db;
var modulo = angular.module('starter', ['ionic', 'ngCordova'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

    /*Creación inicial de tablas e inicialización de base de datos*/
      db = window.openDatabase('mia', '1', 'default', semillaBd.credenciales.length);
      // db = $cordovaSQLite.openDB({ name: "mia.db", location: 1});
      db.transaction(function (tx) {
        var creacionTablas = {
          count:semillaBd.creacionTablas[semillaBd.version].length,
          arraySql: semillaBd.creacionTablas[semillaBd.version]
        }

        for (var i = 0; i < creacionTablas.count; i++) {
          tx.executeSql(creacionTablas.arraySql[i]);
        }
      }, function (succ) { alert('Base de datos cargada con exito'); },
        function (err) { console.log('Error'); });

    });
  });
