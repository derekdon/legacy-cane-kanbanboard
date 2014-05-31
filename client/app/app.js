'use strict';

var _ = require('underscore');

angular.module('kanbanboard', [
    'ui.router',
    'ui.bootstrap',
    'xeditable',
    require('common/js/config').name,
    require('common/js/directives').name,
    require('common/js/factories').name,
    require('common/js/filters').name,
    require('common/js/services').name,
    require('module/about').name,
    require('module/analytics').name,
    require('module/avatar').name,
    require('module/board').name,
    require('module/stage').name,
    require('module/ticket').name
])
    .config(function appConfig($stateProvider, $urlRouterProvider, HOME) {
        $urlRouterProvider.otherwise(HOME);
    })
    .run(function run(editableOptions) {
        console.log('Module dependencies loaded.');
        editableOptions.theme = 'bs3';
    })
    .controller('AppCtrl', function ($scope, $location, AvatarService, TicketService, BoardService) {

        var appCtrl = this;
        appCtrl.APP_TITLE = 'Kanban Board';

        appCtrl.avatars = AvatarService.avatars;
        appCtrl.ticketData = TicketService.ticketData;
        appCtrl.boardData = BoardService.boardData;

        $scope.$on('$stateChangeSuccess', function (event, toState) {
            $scope.pageTitle = angular.isDefined(toState.data) ? toState.data.pageTitle || '' : '';
            $scope.fullPageTitle = _.str.isBlank($scope.pageTitle) ? appCtrl.APP_TITLE : $scope.pageTitle + ' | ' + appCtrl.APP_TITLE;
        });
    });