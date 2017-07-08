modulo.controller('SalidaCtrl', salidaController);

function salidaController($scope,$state, movimientosService, generalesService) {
  function inicializaSalida(){
    $scope.montoSalida = {
      valor: 0,
      valorMax:0,
      detalle:'',
      tipoActividad: '',
      actividades: [],
      fecha: new Date()
    }


  }

  $scope.$on('$ionicView.afterEnter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    movimientosService.obtenerListadoActividadesPorBase().then(function(data){
      $scope.montoSalida.actividades = data;
    }, function(err){
      generalesService.generarMensajeCorto("No pude traer las actividades D:");
    });
  });

  $scope.agregarSalida = function () {
    if($scope.montoSalida.valor > 0 || $scope.montoSalida.detalle.length > 0){
      movimientosService.registrarMovimiento("Salida",
            $scope.montoSalida.valor,
            $scope.montoSalida.detalle,
            $scope.montoSalida.tipoActividad != 0 ? $scope.montoSalida.tipoActividad : null
      ).then(function(data){
        generalesService.generarMensajeCorto("Movimiento realizado con exito");
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
