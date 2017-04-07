controladoresModule.controller('TestCtrl',TestCtrl);

function TestCtrl($scope, movimientosService){

  $scope.$on('creacionBase', function(){
    movimientosService.obtenerBaseActual().then(function(data){
      var base = data;
    }, function(err){
      alert("paila");
    });
  })



}

TestCtrl.$inject = ['$scope', 'movimientosService'];
