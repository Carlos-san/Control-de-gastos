controladoresModule.directive("basesDir", basesDir);

function basesDir(){
  return {
    restrict: 'EA',
    templateUrl: '../../templates/directive/bases.html',
    scope: {
        ngModel: '=',
        idBase: '=',
        cantidadTotal: '='
    },
    controller: verBaseController
  }
}

function verBaseController($scope, movimientosService){
  $scope.datosBase = {
    valorRestante: 0,
    grupoRiesgo: 0, //Grupo de riesgo: 0-> mayor al 66%, 1-> mayor al 33%, 2-> menor al 33
    verDetalle: false,
    cantidadEntradas: 0,
    cantidadSalidas: 0
  };

  $scope.$watch('idBase', function(newie){
    if(newie != undefined && newie != 0){
      obtenerValoresBase(newie);
    }
  });

  $scope.$on('actualizarBaseActual', function(){
    obtenerValoresBase($scope.idBase);
  });

  $scope.mostrarDetalleBase = function(){
    if(!$scope.datosBase.verDetalle)
      $scope.datosBase.verDetalle = true;
    else
      $scope.datosBase.verDetalle = false;
  }

  function obtenerValoresBase(valor){
    movimientosService.obtenerValoresRestantesBase(valor).then(function(data){
      $scope.datosBase.cantidadEntradas = data.entradas;
      $scope.datosBase.cantidadSalidas = data.salidas;
      $scope.datosBase.valorRestante = ($scope.cantidadTotal + data.entradas) - data.salidas;
      $scope.datosBase.grupoRiesgo = calcularGrupoPorcentajeBase($scope.datosBase.valorRestante);
    }, function(err){
      //TODO: alguna cosa
    });
  }

  //Calcular en que porcentaje estoy
  function calcularGrupoPorcentajeBase(valorRestante){
    if(valorRestante >= ($scope.cantidadTotal*0.66))
      return 0;
    if(valorRestante >= ($scope.cantidadTotal*0.33))
      return 1;
    else return 2;
  }
}

verBaseController.$inject = ['$scope', 'movimientosService'];
