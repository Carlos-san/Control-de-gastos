controladoresModule.controller('TestCtrl',TestCtrl);

function TestCtrl($scope){

  $scope.event1 = function () {
    alert("event1");
  }
  $scope.$on('floating-menu:open', function () {
    alert('open');
  });
  $scope.$on('floating-menu:close', function () {
    alert('close');
  });
}

TestCtrl.$inject = ['$scope'];
