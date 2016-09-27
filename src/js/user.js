angular.module("mainApp", ['ui.router', 'ui.materialize', 'navbarApp'])
    .controller('mainController', ['$scope', function($scope) {

        $scope.header = "Starter Template";
    }])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
            url: '/',
            templateUrl: 'starter-template.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'about/about.html'
            });
    });

angular.module('navbarApp', [])
    .directive('sidenavInit', function () {
        return {
            link: function (scope, element) {
                element.sideNav();
            }
        };
    });
