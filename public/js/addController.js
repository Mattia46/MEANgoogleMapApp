var addController = angular.module('addController', ['geolocation', 'gservice']);
addController.controller('addController', function($scope, $http, geolocation, gservice){

  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  $scope.formData.latitude = 51.5155894;
  $scope.formData.longitude = -0.2559607;

  $scope.createUser = function() {

    // Grabs all of the text box fields
    var userData = {
      username: $scope.formData.username,
      gender: $scope.formData.gender,
      favlang: $scope.formData.favlang,
      location: [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified: $scope.formData.htmlverified
    };

    $http.post('/users', userData)
    .success(function (data) {

      $scope.formData.username = "";
      $scope.formData.gender = "";
      $scope.formData.age = "";
      $scope.formData.favlang = "";
      gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    })
    .error(function (data) {
      console.log('Error: ' + data);
    });
  };
});

