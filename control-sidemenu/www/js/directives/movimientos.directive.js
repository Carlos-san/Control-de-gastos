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

function movimientosDirController($scope, movimientosService){
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
}

movimientosDirController.$inject = ['$scope', 'movimientosService'];
