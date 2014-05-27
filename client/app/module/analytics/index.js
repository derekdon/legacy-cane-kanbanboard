'use strict';

exports = angular.module('kanbanboard.module.analytics', [
        require('angular-ui-router').name
    ])
    .config(function config($stateProvider) {
        $stateProvider
            .state('analytics', {
                url: '/analytics',
                views: {
                    'main': {
                        controller: 'AnalyticsCtrl',
                        controllerAs: 'analyticsCtrl',
                        templateUrl: 'app/module/analytics/index.html'
                    }
                }
            });
    })
    .controller('AnalyticsCtrl', function () {
    });