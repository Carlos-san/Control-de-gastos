modulo.controller('ActividadCtrl', actividadController);

function actividadController($scope) {
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
    console.log($scope.nuevaActividad);
    $state.go('app.dash');
  }


  inicializaActividad();
}
actividadController.$inject = ['$scope'];
