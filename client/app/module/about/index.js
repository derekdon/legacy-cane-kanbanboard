'use strict';

exports = angular.module('kanbanboard.module.about', [
        require('angular-ui-router').name
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
    .controller('AboutCtrl', function () {
    });