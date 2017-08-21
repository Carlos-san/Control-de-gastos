modulo.service("generalesService", generalesService);

function generalesService(){

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

generalesService.$inject = []
