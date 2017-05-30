modulo.controller('resumenBasesController', resumenBasesController);

function resumenBasesController($scope, movimientosService){
  $scope.bases = [];

  function obtenerListadoBases(){
    movimientosService.obtenerHistoricoBases().then(function(data){
      $scope.bases = data;
    }, function(err){
      console.log(err);
      alert("No fue posible hacer de todo");
    });
  }

  obtenerListadoBases();
}

resumenBasesController.$inject = ["$scope", "movimientosService"];
