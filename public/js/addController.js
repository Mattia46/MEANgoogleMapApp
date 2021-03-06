var addController = angular.module('addController', ['geolocation', 'gservice']);
addController.controller('addController', function($scope, $http, $rootScope, geolocation, gservice){

  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var lng = 0;

  $scope.formData.latitude = 39.500;
  $scope.formData.longitude = -98.350;

  geolocation.getLocation().then(function(data){
  coords = {lat:data.coords.latitude, lng:data.coords.longitude};
  $scope.formData.longitude = parseFloat(coords.lng).toFixed(3);
  $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
  $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

  gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

});

$rootScope.$on("clicked", function(){
  $scope.$apply(function(){
    $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
    $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
    $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
  });
});

$scope.refreshLoc = function(){
  geolocation.getLocation().then(function(data){
  coords = {lat:data.coords.latitude, long:data.coords.longitude};

  $scope.formData.longitude = parseFloat(coords.long).toFixed(8);
  $scope.formData.latitude = parseFloat(coords.lat).toFixed(8);
  //$scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
  gservice.refresh(coords.lat, coords.long);
});
};
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

