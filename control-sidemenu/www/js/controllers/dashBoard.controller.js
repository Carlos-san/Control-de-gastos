modulo.controller('DashCtrl', dashController);

function dashController($scope, $cordovaSQLite, $ionicPlatform, movimientosService) {
  $scope.base = {
    id: 0,
    valor_total: 0,
    fecha_inicial: "",
    fecha_final: ""
  };

  //Llamado a la carga inicial de los datos del dashboard
  $ionicPlatform.ready(function(){
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

dashController.$inject = ['$scope', '$cordovaSQLite', '$ionicPlatform', 'movimientosService'];
