controladoresModule.controller('TestCtrl',TestCtrl);

function TestCtrl($scope, movimientosService){
 $scope.actividades = [
   { titulo: 'Boyacá',tipo:'Vacaciones', descripcion: 'Viaje en semana santa', icon:'ion-android-plane' },
   { titulo: 'Hoteles',tipo:'Hospedaje', descripcion: 'fectivo para hospedajes', icon:'ion-ios-home' },
 ];
  $scope.$on('creacionBase', function(){
    movimientosService.obtenerBaseActual().then(function(data){
      var base = data;
    }, function(err){
      alert("paila");
    });
  })



}

TestCtrl.$inject = ['$scope', 'movimientosService'];
