modulo.controller('EntradaCtrl', entradaController);

function entradaController($scope,$state, movimientosService, generalesService) {
  function inicializaEntrada(){
    $scope.montoEntrada = {
      valor: 0,
      detalle:"",
      fecha: new Date()
    }
  }
  $scope.agregarEntrada = function () {
    if($scope.montoEntrada.valor > 0 || $scope.montoEntrada.detalle.length > 0){
      movimientosService.registrarMovimiento("Entrada", $scope.montoEntrada.valor, $scope.montoEntrada.detalle, null).then(function(data){
        generalesService.generarMensajeCorto("Movimiento realizado con exito");
        $scope.$broadcast('actualizarBaseActual');
        $scope.$broadcast('actualizarMovimientosBase');
        $state.go('app.dash');
      }, function(err){
        generalesService.generarMensajeCorto("Se produjo un error al realizar el movimiento");
      });
    }else
      alert("Poner un mensaje");
  }

  inicializaEntrada();
}
entradaController.$inject = ['$scope','$state','movimientosService','generalesService'];
