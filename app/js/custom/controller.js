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
      $scope.details;
      $scope.showform = true;
      $scope.story = "";
      // document.getElementById("logo").style.display="block";
      // document.getElementById("logo1").style.display="block";
      // document.getElementById("logo2").style.display="block";
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
          document.getElementById("logo").style.display="none";
          document.getElementById("logo1").style.display="none";
          document.getElementById("logo2").style.display="none";
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

    // $scope.hideForm = function(){
    //   document.getElementById("logo").style.display="none";
    //   document.getElementById("logo1").style.display="none";
    //   document.getElementById("logo2").style.display="none";
    // }

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
          $location.path('/login');
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

      $scope.createArticle = function(){
        var artcleData = {
          title: $scope.title,
          tags: $scope.tag,
          body: $scope.body
        }
        Main.create(artcleData, function(response){
          $scope.story = response;
          console.log(response);
          $scope.body = "";
          $scope.tag = "";
          $scope.title = "";
        }, function(){
          $rootScope.error = "data not sent";
        }) 
      }
  }]);