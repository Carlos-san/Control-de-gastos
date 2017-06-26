modulo.controller('AppCtrl', AppController);

function AppController($scope, $ionicPopover, $ionicModal, generalesService, movimientosService) {

  /* Inicializadores */
  function inicializaMontoBase(){
    $scope.montoBase = {
      valor: 0,
      periodoInicial: new Date(),
      periodoFinal: new Date()
    }
  }

  $ionicPopover.fromTemplateUrl('templates/modals/opciones-agregar.html', {
      scope: $scope
  }).then(function(popover) {
      $scope.popover = popover;
  });

  $scope.openPopover = function($event, type) {
      $scope.type = type;
      $scope.popover.show($event);
  };

  $scope.closePopover = function() {
      $scope.popover.hide();
      // if you are navigating away from the page once
      // an option is selected, make sure to call
      //$scope.popover.remove();
  };



  /*----------Registro de monto base----------*/
  $scope.bntAgregarBase = function () {
    inicializaMontoBase();
    $ionicModal.fromTemplateUrl('templates/modals/agregar-base.html', {
      scope: $scope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      $scope.modalBase = modal;
      $scope.modalBase.show();
      $scope.closePopover();
    });
  }

  $scope.agregarBase = function(){
    var fechaInicial = moment($scope.montoBase.periodoInicial).format("DD/MM/YYYY");
    var fechaFinal = moment($scope.montoBase.periodoFinal).format("DD/MM/YYYY");

    if(fechaInicial < fechaFinal){
        movimientosService.registrarBase("Sin descripción", fechaInicial, fechaFinal, $scope.montoBase.valor)
        .then(function(data){
          generalesService.generarMensajeCorto("Base por periodo realizada correctamente");
          $scope.$broadcast('creacionBase');
          $scope.modalBase.hide();
        }, function(err){
          alert("No fue posible registrar la base");
        });
    }else{
      alert("la fecha final debe ser mayor a la inicial");
    }
  }

  $scope.cerrarBase = function() {$scope.modalBase.hide();};
  /*----------------------------------------*/

  inicializaMontoBase();
}

AppController.$inject = ['$scope', '$ionicPopover', '$ionicModal','generalesService', 'movimientosService'];
