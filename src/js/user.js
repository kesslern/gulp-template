angular.module("mainApp", ['ui.router'])
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


// TODO: Use a directive
(function($){
    $(function(){

        $('.button-collapse').sideNav();

    }); // end of document ready
})(jQuery); // end of jQuery name space