'use strict';

module.exports = angular.module('kanbanboard.module.analytics', [
        'ui.router'
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