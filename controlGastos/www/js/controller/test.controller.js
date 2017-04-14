controladoresModule.controller('TestCtrl',TestCtrl);

function TestCtrl($scope, movimientosService){
  $scope.data = {};

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
    console.log("ahora paso aqui");
    movimientosService.obtenerBaseActual().then(function(data){
      $scope.base = data;
    }, function(err){
      alert("paila");
    });
  }

  //TODO: Quitar cuando se compile
  creacionBase();
  document.addEventListener("baseDatosCreada", function() {
    movimientosService.obtenerBaseActual().then(function(data){
      $scope.base = data;
    }, function(err){
      alert("paila");
    });
  }, false);


  // setTimeout(function(){ creacionBase() }, 5000);
}

TestCtrl.$inject = ['$scope', 'movimientosService'];
