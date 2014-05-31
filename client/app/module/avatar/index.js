'use strict';

var moment = require('moment');

module.exports = angular.module('kanbanboard.module.avatar', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
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
    })
    .service('AvatarService', function (CBDocService) {
        var service = this,
            JSONTYPE = 'avatar';

        service.showAvatar = function (id) {
            return CBDocService.showItem(id, JSONTYPE);
        };

        service.addAvatar = function (spec) {

            var newAvatar = {
                jsonType: JSONTYPE,
                alias: spec.alias,
                fullName: spec.fullName,
                email: spec.email || '',
                team: spec.team || '',
                role: spec.role || '',
                active: true,
                created: +moment(),
                avatarHandles: spec.avatarHandles || {}
            };

            // Need to hook up actually adding it to the db
            // To match what's already in the array, this would need to be {avatar: newAvatar, userFields: map}
            this.avatarData.push(newAvatar);
        };

        // Test data, won't be read from here normally
        service.avatars = [
            {
                id: 'user::123123123',
                jsonType: 'user',
                alias: 'UI Dev Team',
                fullName: 'UI Dev Team',
                email: 'uidevteam@companyXYZ.com',
                team: 'ui-dev',
                role: 'team',
                active: true,
                note: 'New tickets are assigned to me by default',
                avatarHandles: {
                    twitter: '@angularjs'
                },
                displayOnBoard: false,
                created: +moment()
            },
            {
                id: 'user::9645645467',
                jsonType: 'user',
                alias: 'derekdon',
                fullName: 'Derek Donnelly',
                email: 'derek@derekdonnelly.com',
                team: 'ui-dev',
                role: 'developer',
                active: true,
                avatarHandles: {
                    twitter: '@derekdon'
                },
                displayOnBoard: true,
                created: +moment()
            },
            {
                id: 'user::234687897',
                jsonType: 'user',
                alias: 'Spanton',
                fullName: 'Mr. Spanton',
                email: 'spanton@spanton.com',
                team: 'ui-dev',
                role: 'developer',
                active: true,
                avatarHandles: {
                    twitter: '@megastoat'
                },
                displayOnBoard: true,
                created: +moment()
            }
        ];
    })
    .controller('AvatarCtrl', function (AvatarService) {
        var avatarCtrl = this;
        avatarCtrl.showAvatar = AvatarService.showAvatar;
        avatarCtrl.addAvatar = AvatarService.addAvatar;
        avatarCtrl.avatars = AvatarService.avatars;

        // Sorting tabular data
        avatarCtrl.predicate = '-created';
        avatarCtrl.reverse = false;
        avatarCtrl.predicateReverse = function (val) {
            avatarCtrl.predicate = val;
            avatarCtrl.reverse = !avatarCtrl.reverse;
        };
    })
    .directive('avatarTd', function () {
        return {
            restrict: 'A',
            scope: {
                handles: '='
            },
            template: '<img class="avatar-img" src="http://avatars.io/twitter/{{handles.twitter}}">'
        };
    });