'use strict';

module.exports = function config($stateProvider) {
    $stateProvider
        .state('stage', {
            url: '/stage',
            abstract: true,
            views: {
                'main': {
                    controller: 'StageCtrl',
                    controllerAs: 'stageCtrl',
                    template: '<h1 class="page-header" ng-show="pageTitle">{{pageTitle}}</h1>' +
                        '<div ui-view />'
                }
            }
        })
        .state('stage.list', {
            url: '',
            templateUrl: 'app/module/stage/list.html',
            data: { pageTitle: 'Workflow Stages' }
        })
        .state('stage.new', {
            url: '/new',
            templateUrl: 'app/module/stage/new.html',
            data: { pageTitle: 'Add Workflow Stage' }
        })
        .state('stage.reset', {
            url: '/reset',
            templateUrl: 'app/module/stage/reset.html',
            data: { pageTitle: 'Reset Workflow Stages' }
        })
        .state('stage.detail', {
            url: '/:id',
            templateUrl: 'app/module/stage/detail.html',
            data: { pageTitle: 'Workflow Stage' }
        });
};