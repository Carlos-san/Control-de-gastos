modulo.controller('DashCtrl', dashController);

function dashController($scope, $cordovaSQLite, movimientosService) {
  $scope.base = {
    id: 0,
    valor_total: 0
  };

  $scope.makeItBase = function(){
    movimientosService.registrarBase(
      "UN nombre", "05/05/2017", "06/06/2017", 2222
    ).then(function(a){
      movimientosService.obtenerBaseActual().then(function(data){
        alert(data.id);
        $scope.base = data;
      }, function(err){
        alert("paila");
      });
    }, function(b){ alert(b);});
  }
}

dashController.$inject = ['$scope', '$cordovaSQLite', 'movimientosService'];
