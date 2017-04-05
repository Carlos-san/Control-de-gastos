serviciosModule.service("movimientosService", movimientosService);

function movimientosService($q, $cordovaSQLite){
  var _db;

  //Prepara la conexión
  var iniciarConexion = function(){
    if(_db == null){
        if(semillaBd != undefined){
          if(window.cordova)
            _bd = window.sqlitePlugin.openDatabase({ name: semillaBd.credenciales.nombre, location: 2, createFromLocation: 1 });
          else //Depurar en navegador
            _bd = window.openDatabase(semillaBd.credenciales.nombre , '1', 'default', semillaBd.credenciales.length);

          return true;
        }else{
          return false; //"No fue posible acceder a las credenciales de usuario");
        }
    } return true;
  }

  //Crea las tablas en BD
  var prepararBaseDatos = function(){
    var respuesta = $q.defer();

    for(var i = 0; i < semillaBd.creacionTablas.length; i++){
      ejecutarQuery(semillaBd.creacionTablas[i]).then(function(){ }, function(){
        respuesta.reject("No fue posible preparar la base de datos");
        return respuesta.promise;
      });
    }
    respuesta.resolve("Ok");
    return respuesta.promise;
  }

  //Método general para consultar la bd
  var ejecutarQuery = function(query, parametros){
    return  $cordovaSQLite.execute(_db, query, parametros);
  }

  return {
    iniciarConexion: iniciarConexion
    prepararBaseDatos: prepararBaseDatos
  }
}

movimientosService.$inject = ['$q', '$cordovaSQLite'];
