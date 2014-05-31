'use strict';

module.exports = angular.module('kanbanboard.module.about', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                views: {
                    'main': {
                        controller: 'AboutCtrl',
                        controllerAs: 'aboutCtrl',
                        templateUrl: 'app/module/about/index.html'
                    }
                }
            });
    })
    .controller('AboutCtrl', function ($scope, VERSION) {
        $scope.VERSION = VERSION;
    });