modulo.service("generalesService", generalesService);

function generalesService($cordovaToast){

  //Muestra un mensaje por defecto
  var generarMensajeCorto = function( mensaje){
    // if(window.cordova)
    //   $cordovaToast.show(mensaje, 'short', 'center')
    //     .then(function(success) {}, function (error) {});
    // else{
      alert(mensaje);
    // }
  }

  return {
    generarMensajeCorto : generarMensajeCorto
  }
}

generalesService.$inject = ['$cordovaToast']
