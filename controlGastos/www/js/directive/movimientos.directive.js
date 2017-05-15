modulo.directive("movimientosDir", movimientosDir);

function movimientosDir(){
  return {
    restrict: 'EA',
    templateUrl: '../../templates/movimientos.html',
    scope: {
        idBase: '<'
    },
    controller: movimientosDirController
  }
}

function movimientosDirController($scope, movimientosService){
  $scope.movimientos = [];

  $scope.$watch('idBase', function(newie){
    if(newie != undefined && newie != 0){
      obtenerValoresMovimientos(newie);
    }
  });

  $scope.$on('actualizarMovimientosBase', function(){
    obtenerValoresMovimientos($scope.idBase);
  });

  function obtenerValoresMovimientos(idBase){
    movimientosService.obtenerMovimientosPorBase(idBase).then(function(data){
      $scope.movimientos = [];
      for(var i = 0; i < data.length; i++){
          $scope.movimientos.push(data[i]);
      }
    }, function(err){
      //TODO: reportar errores
    });
  }
}

movimientosDirController.$inject = ['$scope', 'movimientosService'];
