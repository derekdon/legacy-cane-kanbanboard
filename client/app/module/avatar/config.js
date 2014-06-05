'use strict';

module.exports = function config($stateProvider) {
    $stateProvider
        .state('avatar', {
            url: '/avatar',
            abstract: true,
            views: {
                'main': {
                    controller: 'AvatarCtrl',
                    controllerAs: 'avatarCtrl',
                    template: '<h1 class="page-header" ng-show="pageTitle">{{pageTitle}}</h1>' +
                        '<div ui-view />'
                }
            }
        })
        .state('avatar.list', {
            url: '',
            templateUrl: 'app/module/avatar/list.html',
            data: { pageTitle: 'Avatars' }
        })
        .state('avatar.new', {
            url: '/new',
            templateUrl: 'app/module/avatar/new.html',
            data: { pageTitle: 'Add Avatar' }
        })
        .state('avatar.detail', {
            url: '/:id',
            templateUrl: 'app/module/avatar/detail.html',
            data: { pageTitle: 'Avatar' }
        });
};