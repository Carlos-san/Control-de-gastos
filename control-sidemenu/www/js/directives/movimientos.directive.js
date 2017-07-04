modulo.directive("movimientosDir", movimientosDir);

function movimientosDir(){
  return {
    restrict: 'EA',
    templateUrl: 'templates/directives/movimientos.html',
    scope: {
        ngModel: '=',
        baseId: '='
      },
    controller: movimientosDirController
  }
}

function movimientosDirController($scope, movimientosService, generalesService){
  $scope.movimientos = [];

  $scope.$watch('baseId', function(newie){
    if(newie != undefined && newie != 0){
      obtenerValoresMovimientos(newie);
    }
  });

  $scope.$on('actualizarMovimientosBase', function(){
    obtenerValoresMovimientos($scope.baseId);
  });

  function obtenerValoresMovimientos(idBase){
    $scope.movimientos = [];
    movimientosService.obtenerMovimientosPorBase(idBase).then(function(data){
      $scope.movimientos = [];
      for(var i = 0; i < data.length; i++){
          $scope.movimientos.push(data[i]);
          $scope.movimientos[i].fecha = moment($scope.movimientos[i].fecha, "YYYYMMDD").format("DD/MM/YYYY");
      }
    }, function(err){
      //TODO: reportar errores
    });
  }

  $scope.removeItem = function (movimiento){
    movimientosService.eliminarMovimiento(movimiento.id).then(function(data){
      generalesService.generarMensajeCorto("Movimiento eliminado correctamente");
      obtenerValoresMovimientos($scope.baseId);
      $scope.$emit('actualizarBaseActual');
    }, function (err){
      generalesService.generarMensajeCorto("Ups, no pudimos eliminar el movimiento");
    });
  }
}

movimientosDirController.$inject = ['$scope', 'movimientosService', 'generalesService'];
