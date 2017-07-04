modulo.controller('ActividadCtrl', actividadController);

function actividadController($scope, $state, movimientosService, generalesService) {
  function inicializaActividad(){
    $scope.nuevaActividad = {
      nombre: '',
      descripcion: '',
      tipoActividad: '',
      tipos: [{id:1,nombre:'Vacaciones'},{id:2,nombre:'Hospedaje'}],
      fecha: new Date()
    }
  }

  $scope.agregarActividad = function () {
    movimientosService.registrarActividad(1, $scope.nuevaActividad).then(function(data){
      generalesService.generarMensajeCorto("Actividad registrada con exito");
      $state.go('app.dash');
    }, function (err){
      generalesService.generarMensajeCorto("No fue posible registrar la actividad");
    });

  }

  inicializaActividad();
}
actividadController.$inject = ['$scope', '$state', 'movimientosService', 'generalesService'];
