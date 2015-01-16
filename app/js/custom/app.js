'use strict'

angular.module('angularRestfulAuth', ['ngStorage','ngRoute'])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider){
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'BloggerController'
      }).
      when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'BloggerController'
      }).
      otherwise({
        redirectTo: '/'
    });

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage){
      return {
        'request':function(config){
         config.headers = config.headers || {};
          if ($localStorage.token) {
              config.headers.Authorization = 'Bearer ' + $localStorage.token;
          }
          return config;
        },
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
            $location.path('/signin');
          }
          return $q.reject(response);
        }
      };
    }]);

}]);