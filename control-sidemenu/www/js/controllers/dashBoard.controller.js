modulo.controller('DashCtrl', dashController);

function dashController($scope, $cordovaSQLite, movimientosService) {
  $scope.base = {
    id: 0,
    valor_total: 0
  };

  setTimeout(function(){
    cargaInicialBases();
  }, 1000);

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
