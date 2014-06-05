'use strict';

module.exports = function config($stateProvider) {
    $stateProvider
        .state('board', {
            url: '/board',
            abstract: true,
            views: {
                'main': {
                    controller: 'BoardCtrl',
                    controllerAs: 'boardCtrl',
                    template: '<h1 class="page-header" ng-show="pageTitle">{{pageTitle}}</h1>' +
                        '<div ui-view />'
                }
            }
        })
        .state('board.detail', {
            url: '/show/:id',
            templateUrl: 'app/module/board/detail.html',
            data: { pageTitle: 'The Board' }
        })
        .state('board.new', {
            url: '/new',
            templateUrl: 'app/module/board/new.html',
            data: { pageTitle: 'Create Board' }
        })
        .state('board.collaborate', {
            url: '/collaborate',
            templateUrl: 'app/module/board/collaborate.html',
            data: { pageTitle: 'Collaborate' }
        })
        .state('board.reset', {
            url: '/reset',
            templateUrl: 'app/module/board/reset.html',
            data: { pageTitle: 'Reset Board' }
        })
        .state('board.destroy', {
            url: '/destroy',
            templateUrl: 'app/module/board/destroy.html',
            data: { pageTitle: 'Destroy Board' }
        });
};