modulo.directive("calendarioDiarioDir", calendarioDiarioDir);

function calendarioDiarioDir(){
  return {
    restrict: 'EA',
    templateUrl: 'templates/directives/calendario-diario.html',
    scope: {
        ngModel: '='
      },
    controller: calendarioDiarioDirController
  }
}

function calendarioDiarioDirController($scope, $ionicPosition, $ionicScrollDelegate, $timeout){
  var date = new Date();
  var toDay = date.getDate();
  var iCount = 1;
  var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  $scope.days = [];

  for (iCount; iCount<=lastDayOfMonth; iCount++){
    $scope.days.push({day: iCount, state: (toDay==iCount) });
  }

  $scope.scrollEvent = function(){
     $timeout(function(){ $scope.$broadcast('scrollToDay'); }, 0);
   };
  $scope.$on('scrollToDay', function(event, args) {
    var quotePosition = $ionicPosition.position(angular.element(document.getElementById(toDay)));
    $ionicScrollDelegate.$getByHandle('horizontal').scrollTo(quotePosition.left, quotePosition.top, true);
  });

}

calendarioDiarioDirController.$inject = ['$scope', '$ionicPosition', '$ionicScrollDelegate', '$timeout'];
