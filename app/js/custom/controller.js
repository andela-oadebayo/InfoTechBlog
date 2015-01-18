'use strict';

/* Controllers */
angular.module('angularRestfulAuth')
  .controller('BloggerController', 
    ['$rootScope', 
    '$scope', 
    '$location', 
    '$localStorage',
    'Main', 
    function ($rootScope, $scope, $location, $localStorage, Main) {
      $scope.username = "";
      $scope.password = "";
      $scope.details;
      $scope.showform = false;

    $scope.login = function(){
      var formData = {
        email: $scope.email,
        password: $scope.password
      };
      Main.login(formData, function (response){
        if(response.type == false){
          alert(response.data);
        }else{
          $location.path('/user');
          $localStorage.token = response.data.token;
          $rootScope.details = response.data;
          console.log(response.data);
          $scope.details = response.data;
        }
      }, function() {
        $rootScope.error = 'Failed to signin';
        console.log($rootScope.error);
      })
    };


    $scope.allPost = function() {
      Main.me(function (response){
        $scope.articles = response;
      }, function(){
        $rootScope.error = "Failed to fetch articles"
      })
    }

    $scope.signup = function() {
      var formData = {
        fname: $scope.fname,
        lname: $scope.lname,
        email: $scope.email,
        nickname: $scope.nickname,
        password: $scope.password
      };
      console.log(formData);
      Main.save(formData, function (response){
        if(response.type == false){
          alert(response.data);
        }else{
          $localStorage.token = response.data.token;
         // window.location = "#/success";
        }
      }, function(){
        $rootScope.error = 'Failed to signup';
      })
    };

    $scope.user = function() {
      Main.me(function (response) {
        $scope.myDetails = response;
      }, function() {
        $rootScope.error = 'Failed to fetch details';
      })
    };

    $scope.token = $localStorage.token;
  }])
    .controller('UserController', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {
      Main.me(function(response) {
        console.log(response);
        $scope.myDetails = response;
      }, function() {
        $rootScope.error = 'Failed to fetch details';
    });
      $scope.logout = function() {
        Main.logout(function() {
        window.location = "#/home"
        }, function() {
          alert("Failed to logout!");
        });
      };

      Main.allPost(function (response){
        $scope.articles = response;
        console.log(response);
      }, function(){
        $rootScope.error = "Failed to fetch articles"
      });
  }]);