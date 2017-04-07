controladoresModule.directive('actividadesDir',actividadesDir);

function actividadesDir(){
  return{
    scope:{
      actividades: '=actividades'
    },
    templateUrl:'../../templates/directive/actividades.html'
  }
}
