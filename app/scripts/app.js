'use strict';

/**
 * @ngdoc overview
 * @name d3TestApp
 * @description
 * # d3TestApp
 *
 * Main module of the application.
 */
angular
  .module('d3TestApp', [
   'ngRoute',
   'd3',
   'directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
