'use strict';

module.exports = function config($stateProvider) {
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
};