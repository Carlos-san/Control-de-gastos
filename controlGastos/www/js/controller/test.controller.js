controladoresModule.controller('TestCtrl',TestCtrl);

function TestCtrl($scope, movimientosService){
  $scope.base = {
    id: 0,
    valor_total: 0
  };
 $scope.actividades = [
   { titulo: 'Boyacá',tipo:'Vacaciones', descripcion: 'Viaje en semana santa', icon:'ion-android-plane' },
   { titulo: 'Hoteles',tipo:'Hospedaje', descripcion: 'fectivo para hospedajes', icon:'ion-ios-home' },
 ];
  $scope.$on('creacionBase', function(){
      creacionBase();
  });

  function creacionBase(){
    movimientosService.obtenerBaseActual().then(function(data){
      $scope.base = data;
    }, function(err){
      alert("paila");
    });
  }

  creacionBase();
}

TestCtrl.$inject = ['$scope', 'movimientosService'];
