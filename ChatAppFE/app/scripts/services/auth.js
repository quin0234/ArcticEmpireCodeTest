'use strict';
/**
 * @ngdoc service
 * @name chatAppFeApp.Auth
 * @description
 * # Auth
 * Service in the chatAppFeApp.
 */
angular.module('chatAppFeApp')
  .service('Auth', function ($rootScope, ChatUser,$location) {
    var self = {
      signup:function (data) {
        ChatUser.create(data, function (){
          ChatUser.login(data,function(data){
          self.currentUser = data.user;
          $rootScope.isLogged = true;
          $location.path('/');
        });
      });
  },
    login: function (user) {
      ChatUser.login(user, function (data) {
        self.currentUser = data.user;
        console.log(self.currentUser);
        $rootScope.isLogged = true;
        if ($location.nextAfterLogin === null) {
          $location.path('/');
        } else {
          $location.path($location.nextAfterLogin);
        }
      }

    )
      ;
    }
  ,
    logout: function () {
      ChatUser.logout(function () {
        $location.path('/');
        $rootScope.isLogged = false;
        self.currentUser = null;
      });
    }
  ,
    ensureCurrentUser: function (cb) {
      if (ChatUser.isAuthenticated() && self.currentUser == null) {
        $rootScope.isLogged = true;
        ChatUser.getCurrent(function (data) {
          self.currentUser = data;
          cb();
        });
      }
    }
  ,
    currentUser:null
  };
  return self;
  });
