controladoresModule.controller('AppCtrl',AppCtrl);
function AppCtrl ($scope, $ionicModal, movimientosService){
  $scope.estadoError = false;


  function inicializaMontoBase(){
    $scope.montoBase = {
      valor: 0,
      periodoInicial: new Date(),
      periodoFinal: new Date()
    }
  }
  function inicializaSalida(){
    $scope.montoSalida = {
      valor: 0,
      valorMax:0,
      detalle:"",
      fecha: new Date()
    }
  }
  function inicializaActividad(){
    $scope.nuevaActividad = {
      nombre: '',
      descripcion: '',
      tipo: '',
      fecha: new Date()
    }
  }

  /*----------Registro de monto base----------*/

  $scope.bntAgregarBase = function () {
    inicializaMontoBase();
    $ionicModal.fromTemplateUrl('templates/modal/agregar-base.html', {
      scope: $scope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      $scope.modalBase = modal;
      $scope.modalBase.show();
    });
  }
  $scope.agregarBase = function(){

    movimientosService.registrarBase("Sin descripción",
    moment($scope.montoBase.periodoInicial).format("DD/MM/YYYY"),
    moment($scope.montoBase.periodoFinal).format("DD/MM/YYYY"),
    $scope.montoBase.valor).then(function(data){
      alert("Si pude!");
      $scope.$broadcast('creacionBase');
    }, function(err){
      alert("No fue posible registrar la base");
    });
  }
  $scope.cerrarBase = function() {$scope.modalBase.hide();};
  /*----------------------------------------*/

  /*----------Registro de monto salida----------*/

  $scope.bntAgregarSalida = function () {
    inicializaSalida();
    $ionicModal.fromTemplateUrl('templates/modal/agregar-salida.html', {
      scope: $scope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      $scope.modalSalida = modal;
      $scope.modalSalida.show();
    });
  }
  $scope.agregarSalida = function () {
    console.log($scope.montoSalida.valor);
    console.log($scope.montoSalida.valorMax);
    console.log($scope.montoSalida.fecha);
    console.log($scope.montoSalida.detalle);
  }
  $scope.cerrarSalida = function() {$scope.modalSalida.hide();};
  /*----------------------------------------*/

  $scope.agregarEntrada = function () {
    alert("Agrega una entrada");
  }

  /*----------Registro de monto salida----------*/
  $scope.bntAgregarActividad = function () {
    inicializaSalida();
    $ionicModal.fromTemplateUrl('templates/modal/agregar-actividad.html', {
      scope: $scope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      $scope.modalActividad = modal;
      $scope.modalActividad.show();
    });
  }
  $scope.agregarActividad = function () {
    console.log($scope.nuevaActividad);
  }
  $scope.cerrarActividad = function() {$scope.modalActividad.hide();};
  /*----------------------------------------*/
  inicializaMontoBase();
  inicializaSalida();
  inicializaActividad();
}
AppCtrl.$inject = ['$scope','$ionicModal', 'movimientosService'];
