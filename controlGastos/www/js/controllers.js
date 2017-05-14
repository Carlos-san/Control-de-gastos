modulo.controller('DashCtrl', function($scope, $cordovaSQLite, movimientosService) {
  $scope.base = {
    id: 0,
    valor_total: 0
  };

  $scope.makeItBase = function(){
    movimientosService.registrarBase(
      "UN nombre", "05/05/2017", "06/06/2017", 2222
    ).then(function(a){
      alert("zapato");
      movimientosService.obtenerBaseActual().then(function(data){
        alert(data.id);
        $scope.base = data;
      }, function(err){
        alert("paila");
      });
    }, function(b){ alert(b);});
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
