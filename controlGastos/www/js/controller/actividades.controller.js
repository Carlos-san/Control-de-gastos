controladoresModule.controller('ActividadesCtrl',ActividadesCtrl);

function ActividadesCtrl($scope, $stateParams, movimientosService, uiMoneyMask){
  // Consulta información de la actividad
  $scope.actividad = {
    nombre:'Boyacá',
    tipo:'Vacaciones',
    descripcion:'Viaje en semana santa',
    fecha: new Date(),
    movimientos: [
      { titulo: 'Comida',tipo:'S', descripcion: 'Un chocorramo', fecha: moment(new Date()).format("DD/MM/YYYY hh:mm a"), monto:'500' },
      { titulo: 'Diversion',tipo:'S', descripcion: 'Caballos!', fecha: moment(new Date()).format("DD/MM/YYYY hh:mm a"), monto:'45000'},
      { titulo: 'Prestamo',tipo:'E', descripcion: 'Prestamo realizado a Deisy!', fecha: moment(new Date()).format("DD/MM/YYYY hh:mm a"), monto:'100000'},
    ]
  }
}

ActividadesCtrl.$inject = ['$scope','$stateParams', 'movimientosService'];
