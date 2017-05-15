modulo.service("movimientosService", movimientosService);

  function movimientosService($q, $cordovaSQLite){

  var base = null;


  var inicializar = function(){
    var respuesta = $q.defer();

    prepararBaseDatos().then(function(data){
      respuesta.resolve(true);
    }, function(err){
      respuesta.reject(err);
    });

    return respuesta.promise;
  }

  //Prepara la conexión
  var iniciarConexion = function(){

  }

  //Crea las tablas en BD
  var prepararBaseDatos = function(){
    var respuesta = $q.defer();

    for(var i = 0; i < semillaBd.creacionTablas.length; i++){
      ejecutarQuery(semillaBd.creacionTablas[semillaBd.version][i]).then(function(){ }, function(){
        respuesta.reject("No fue posible preparar la base de datos");
        return respuesta.promise;
      });
    }
    respuesta.resolve("Ok");
    return respuesta.promise;
  }

  //Método general para consultar la bd
  var ejecutarQuery = function(query, parametros){
    return  $cordovaSQLite.execute(db, query, []);
  }

  //Registro de base por periodo
  var registrarBase = function(nombre, finicial, ffinal, valor){
    var respuesta = $q.defer();

    obtenerBaseActual().then(function(data){
      if(data.id == 0){
          var query = "INSERT INTO base (fecha_inicial, fecha_final, nombre, valor_total) "
          query +=    "VALUES ('" + finicial+ "', '" + ffinal + "', '" + nombre + "', " + valor + ")";

          ejecutarQuery(query).then(function(data){

            respuesta.resolve(true);
          }, function(err){
            respuesta.reject('No fue posible registrar la base');
          });
      }else respuesta.resolve(true);
    }, function(err){
      respuesta.reject('No se pudo');
    })
    return respuesta.promise;
  }

  //registra un movimiento de tipo: Entrada o Salida
  var registrarMovimiento = function(tipo, valor, detalle, idActividad){
    var respuesta = $q.defer();
    var query = "INSERT INTO movimientos (valor, tipo, fecha, descripcion, id_actividad, id_base) ";
    query +=    " VALUES(" + valor + ",'" + tipo + "','" + formatearFecha() + "','" + detalle + "', " + idActividad + "," + base.id + ")";

    ejecutarQuery(query).then(function(data){
      respuesta.resolve(true);
    }, function(err){
      respuesta.reject(false);
    });

    return respuesta.promise;
  }

  //Obtiene la base del periodo actual
  var obtenerBaseActual = function(){
    var respuesta = $q.defer();
    var fechaActual = formatearFecha();

    var query = "SELECT id, valor_total FROM base b ";
    // query +=    "WHERE '" + fechaActual + "' > b.fecha_inicial ";
    // query +=    "AND '" + fechaActual + "' < b.fecha_final";


    ejecutarQuery(query).then(function(data){
      console.log(data);
      if(data != undefined && data.rows.length > 0){
        base = data.rows.item(0);
        respuesta.resolve(data.rows.item(0));
      }else
        respuesta.resolve({
          id: 0,
          valor_total: 0
        });
    }, function(err){
      console.log(err);
      respuesta.reject(false);
    });

    return respuesta.promise;
  }

  //Obtiene el valor restante de una base
  var obtenerValoresRestantesBase = function(idBase){
    var respuesta = $q.defer();

    var query = "SELECT valor FROM movimientos WHERE tipo = 'Entrada' AND id_base = " + idBase;
    var querySalida = "SELECT valor FROM movimientos WHERE tipo = 'Salida' AND id_base = " + idBase;

    ejecutarQuery(query).then(function(data){
      var entradas = calcularTotal(data.rows);

      ejecutarQuery(querySalida).then(function(salida){
        var salida = calcularTotal(salida.rows);


        respuesta.resolve({
          entradas: entradas,
          salidas: salida
        });
      }, function(err){
        respuesta.reject(false);
      });

    }, function(err){
      respuesta.reject(false);
    });

    return respuesta.promise;
  }

  var obtenerMovimientosPorBase = function(idBase){
    var respuesta = $q.defer();

    if(base != null){
        var query = "SELECT m.id, m.valor, m.tipo, m.fecha, m.descripcion, a.nombre FROM movimientos m ";
        query +=    "LEFT JOIN actividad a ON a.ID = m.id_actividad "
        query +=    "WHERE m.id_base = " + idBase + " order by fecha DESC";

        ejecutarQuery(query).then(function(data){
          respuesta.resolve(data.rows);
        }, function(err){
          respuesta.reject(false);
        });
    }else respuesta.reject(true);

    return respuesta.promise;
  }

  var obtenerMovimientosPorActividad = function(){

  }

  return {
    //Inicializadores
    iniciarConexion: iniciarConexion,
    prepararBaseDatos: prepararBaseDatos,
    inicializar: inicializar,

    //Comandos
    registrarBase: registrarBase,
    registrarMovimiento: registrarMovimiento,

    //consultas
    obtenerBaseActual: obtenerBaseActual,
    obtenerMovimientosPorBase: obtenerMovimientosPorBase,
    obtenerValoresRestantesBase: obtenerValoresRestantesBase
  }
}

movimientosService.$inject = ['$q', '$cordovaSQLite'];

function formatearFecha(dato){
  var fecha;
  if(dato != undefined )
    var fecha = new Date(dato);
  else fecha = new Date();

  if(fecha != undefined ){
    var month = String(fecha.getMonth() + 1);
    var day = String(fecha.getDate());

    return String(fecha.getFullYear()) + "/" + agregarCeros(month) + "/" + agregarCeros(day) + " " + agregarCeros(String(fecha.getHours())) + ":" + agregarCeros(String(fecha.getMinutes())) + ":" + agregarCeros(String(fecha.getSeconds()));
  }
  return null;
}

function agregarCeros(dato){
  return dato.length < 2 ? '0' + dato : dato;
}

function calcularTotal(arregloValores){
  var length = arregloValores.length;
  var total = 0;

  for(var i = 0; i < length; i++){
    total = total + arregloValores.item(i).valor;
  }
  return total;
}
