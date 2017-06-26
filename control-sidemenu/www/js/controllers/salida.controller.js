modulo.controller('SalidaCtrl', salidaController);

function salidaController($scope,$state, movimientosService, generalesService) {
  function inicializaSalida(){
    $scope.montoSalida = {
      valor: 0,
      valorMax:0,
      detalle:'',
      tipoActividad: '',
      actividades: [{id: 1, nombre: 'Boyacá'},{id: 2, nombre: 'Hoteles'}],
      fecha: new Date()
    }
  }

  $scope.agregarSalida = function () {
    if($scope.montoSalida.valor > 0 || $scope.montoSalida.detalle.length > 0){
      movimientosService.registrarMovimiento("Salida", $scope.montoSalida.valor, $scope.montoSalida.detalle, null).then(function(data){
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

  inicializaSalida();
}
salidaController.$inject = ['$scope','$state', 'movimientosService', 'generalesService'];
