angular.module("mainModule", [])
  .directive('greaterThan', function() {
    return {
      require: 'ngModel',
      scope: {
        greaterThan: '='
      },
      link: function(scope, elem, attr, ngModel) {
        // var blacklist = attr.blacklist.split(',');
        console.log(ngModel)
          //For DOM -> model validation
        ngModel.$parsers.push(function(value) {
          var valid = +value > scope.greaterThan;
          ngModel.$setValidity('greaterThan', valid);
          // return valid ? value : undefined;
          return value;
        });

        // For model -> DOM validation
        ngModel.$formatters.push(function(value) {
          ngModel.$setValidity('greaterThan', +value > scope.greaterThan);
          return value;
        });

        // For greaterThen change -> data validation
        scope.$watch('greaterThan', function(val) {
          if (val) {
            ngModel.$setValidity('greaterThan', +ngModel.$viewValue > val);
          }
        })
      }
    };
  })
  .directive('lessThen', function() {
    return {
      require: 'ngModel',
      scope: {
        lessThen: '='
      },
      link: function(scope, elem, attr, ngModel) {

        //For DOM -> model validation
        ngModel.$parsers.push(function(value) {
          var valid = +value < scope.lessThen;
          ngModel.$setValidity('lessThen', valid);
          // return valid ? value : undefined;
          return value;
        });

        //For model -> DOM validation
        ngModel.$formatters.push(function(value) {
          ngModel.$setValidity('lessThen', +value < scope.lessThen);
          return value;
        });

        scope.$watch('lessThen', function(val) {
          if (val) {
            ngModel.$setValidity('lessThen', +ngModel.$viewValue < val);
          }
        })
      }
    };
  })
  .controller("mainController", function($scope) {
    $scope.numberValue1 = 290;
    $scope.numberValue2 = 300;

  });