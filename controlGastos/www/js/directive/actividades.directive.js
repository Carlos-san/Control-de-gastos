controladoresDirective.directive('actividadesDir',actividadesDir);

function actividadesDir(){
  return{
    restrict:"E",
    scope:{
      actividades: '=actividades'
    },
    templateUrl: 'templates/directive/actividades.html',
    replace: false,
    transclude: true
  }
}
