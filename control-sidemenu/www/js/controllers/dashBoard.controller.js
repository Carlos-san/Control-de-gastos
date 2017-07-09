modulo.controller('DashCtrl', dashController);

function dashController($scope, $cordovaSQLite, movimientosService) {
  $scope.base = {
    id: 0,
    valor_total: 0,
    fecha_inicial: "",
    fecha_final: ""
  };

  //Llamado a la carga inicial de los datos del dashboard
  $scope.$on('$ionicView.afterEnter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    cargaInicialBases();
  });

  function cargaInicialBases(){
    movimientosService.obtenerBaseActual().then(function(data){
      $scope.base = data;
      $scope.$broadcast('actualizarMovimientosBase');
    }, function(err){
      console.log(err);
      alert("No fue posible hacer de todo");
    });
  }

  $scope.$on('creacionBase', function(){
    cargaInicialBases();
  });
}

dashController.$inject = ['$scope', '$cordovaSQLite', 'movimientosService'];
