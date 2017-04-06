controladoresModule.controller('AppCtrl',AppCtrl);
function AppCtrl ($scope,$ionicModal){


  /*----------Registro de monto base----------*/
  $scope.montoBase = {
    valor: 0,
    periodoInicial: new Date(),
    periodoFinal: new Date()
  }

  $scope.bntAgregarBase = function () {
    $ionicModal.fromTemplateUrl('templates/modal/agregar-base.html', {
      scope: $scope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      $scope.modalBase = modal;
      $scope.modalBase.show();
    });
  }
  $scope.agregarBase = function(){
    console.log(moment($scope.montoBase.valor).format("DD/MM/YYYY"));
    console.log(moment($scope.montoBase.periodoInicial).format("DD/MM/YYYY"));
    console.log(moment($scope.montoBase.periodoFinal).format("DD/MM/YYYY"));
  }
  $scope.cerrarBase = function() {$scope.modalBase.hide();};
  /*----------------------------------------*/

  $scope.agregarSalida = function () {
    alert("Agrega una salida");
  }
  $scope.agregarEntrada = function () {
    alert("Agrega una entrada");
  }
  $scope.crearActividad = function () {
    alert("Agrega una actividad");
  }
}
AppCtrl.$inject = ['$scope','$ionicModal'];
