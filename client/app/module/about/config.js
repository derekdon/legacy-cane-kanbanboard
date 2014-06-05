'use strict';

module.exports = function config($stateProvider) {
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
};