angular.module("mainModule", [])
  .directive('compareTo', function() {
    return {
      require: 'ngModel',
      scope: {
        operator: '@',
        compareTo:'='
      },
      link: function(scope, elem, attr, ngModel) {
        function validate(value,compareValue){
          compareValue = compareValue || scope.compareTo;
          var valid = eval(value + scope.operator + compareValue);
          console.log(valid)
          ngModel.$setValidity('compareTo', valid);
          return value; 
        }

        //For DOM -> model validation
        ngModel.$parsers.push(validate);

        // For model -> DOM validation
        ngModel.$formatters.push(validate);

        // For greaterThen change -> data validation
        scope.$watch('compareTo', function(val) {
          if (val!==undefined) {
            validate(+ngModel.$viewValue,val);
          }
        })
      }
    };
  })
  .directive('greaterThan', function() {
    return {
      require: 'ngModel',
      scope: {
        greaterThan: '='
      },
      link: function(scope, elem, attr, ngModel) {
        function validate(value,compareValue){
          compareValue = compareValue || scope.greaterThan;
          var valid = eval(value + '>' + compareValue);
          ngModel.$setValidity('greaterThan', valid);
          return value; 
        }

        //For DOM -> model validation
        ngModel.$parsers.push(validate);

        // For model -> DOM validation
        ngModel.$formatters.push(validate);

        // For greaterThen change -> data validation
        scope.$watch('greaterThan', function(val) {
          if (val!==undefined) {
            validate(+ngModel.$viewValue,val);
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
    for (var i = 3; i < 10; i++) {
      $scope['numberValue'+i]=200;
    };

  });