'use strict';

/**
 * @ngdoc overview
 * @name chatAppFeApp
 * @description
 * # chatAppFeApp
 *
 * Main module of the application.
 */
angular
  .module('chatAppFeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'formly',
    'formlyBootstrap',
    'lbServices',
    'angularMoment'
  ])
  .config(function(LoopBackResourceProvider,$httpProvider){
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');

    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth){
      return {
        responseError: function(rejection) {
          if (rejection.status === 401) {
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $location.nextAfterLogin = $location.path();
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/signup',{
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .when('/login', {
        template: 'views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
