(function () {
  'use strict';

  angular.module('blogYoApp').controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'AuthFactory', 'toasterFactory'];
  /*jshint latedef: false */
  function LoginController($scope, AuthFactory, toasterFactory) {
    var vm = this;
    var usuario = AuthFactory.getUser();
    vm.user = usuario || [];

    vm.isLogged = isLogged;
    vm.doLogin = doLogin;
    vm.doLogout = doLogout;

    iniciar();

    //////////////////////////
    function iniciar() {
      $scope.$watch(function () {
        return vm.user;
      }, function (newValue) {
        AuthFactory.setUser(newValue);
      });
    }

    function isLogged() {
      return AuthFactory.isLogged();
    }

    function doLogin(email, pass) {
      AuthFactory.logar(email, pass).then(function (data) {
        vm.user = data;
      }).catch(function (data) {
        toasterFactory.errorMsg('Erro: ' + data.status);
      });
    }

    function doLogout() {
      AuthFactory.logout();
      vm.user = [];
    }
  }
})();
