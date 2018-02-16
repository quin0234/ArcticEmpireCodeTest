'use strict';

/**
 * @ngdoc function
 * @name chatAppFeApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the chatAppFeApp
 */
angular.module('chatAppFeApp')
  .controller('NavbarCtrl', function ($scope, Auth, $rootScope) {

    $scope.isLoggedin= false;

    Auth.ensureCurrentUser(function(){
      $scope.currentUser=Auth.currentUser;
      $scope.islogged=$rootScope.islogged;
    });

    $rootScope.$watch('islogged', function(newValue, oldValue){
      $scope.isLoggedin=newValue;
      console.log('isLogged changed val: '+newValue);
      if(newValue){
        $scope.currentUser=Auth.currentUser;
        $scope.isLoggedin=newValue;
      }
    });

    $scope.logout = function (){
      Auth.logout();
    }
  });
