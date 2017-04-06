controladoresModule.controller('TestCtrl',TestCtrl);

function TestCtrl($scope, movimientosService){

  $scope.$on('creacionBase', function(){
    debugger;
    movimientosService.obtenerBaseActual().then(function(data){
      debugger;
      var base = data;
    }, function(err){
      alert("paila");
    });
  })



}

TestCtrl.$inject = ['$scope', 'movimientosService'];
