'use strict';

var moment = require('moment'),
    _ = require('underscore');

module.exports = angular.module('kanbanboard.module.board', [
        require('common/js/config').name,
        require('common/js/factories').name,
        require('common/js/services').name,
        'ui.router'
    ])
    .config(function config($stateProvider) {
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
    })
    .service('BoardService', function (CBDocService, StageService, $q) {
        var service = this,
            JSONTYPE = 'board';

        service.boardData = [];

        service.showBoard = function (id) {
            return CBDocService.getItem(id, JSONTYPE);
        };

        service.showBoardChained = function (id) {
            var combinedData = {},
                boardPromise = service.showBoard(id);

            return $q.all({board: boardPromise}).then(function (res) {

                console.log(res.board); // This might need to be res.data.board

                return _.extend(combinedData, {
                    board: res.board
                });
            });
        };

        service.addBoard = function (spec) {

            var newBoard = {
                jsonType: JSONTYPE,
                title: {
                    en: spec.title
                },
                desc: spec.desc,
                owner: spec.owner,
                created: +moment(),
                stages: StageService.stages,
                branchLanes: [
                    'branch::master',
                    'branch::release'
                ]
            };

            return CBDocService.createItem(newBoard);
        };
    })
    .controller('BoardCtrl', function (BoardService, AvatarService, StageService, Alerter, $state, JSON_STATUS) {

        var boardCtrl = this;
        boardCtrl.boardData = BoardService.boardData;
        boardCtrl.showBoard = BoardService.showBoard;
        boardCtrl.addBoard = BoardService.addBoard;
        boardCtrl.avatars = AvatarService.avatars;
        boardCtrl.stages = StageService.stages;

        // Alerts
        boardCtrl.alerts = Alerter.alerts;
        boardCtrl.removeAlert = Alerter.remove;
        var EXPIRES_IN = 1500;
        var goDetailState = function () {
            $state.go('board.detail');
        };

        boardCtrl.imSureToDestroy = false;
        boardCtrl.destroyBoard = function () {
            BoardService.boardData.length = 0;
            StageService.resetStages();
            boardCtrl.imSureToDestroy = false;
            Alerter.add('Your Kanban Board has been destroyed.', Alerter.INFO, EXPIRES_IN, function () {
                goDetailState();
            });
        };

        boardCtrl.imSureToReset = false;
        boardCtrl.resetBoard = function () {
            StageService.resetStages();
            boardCtrl.imSureToReset = false;
            Alerter.add('Your Kanban Board has been reset.', Alerter.INFO, EXPIRES_IN, function () {
                goDetailState();
            });
        };

        // Add form
        boardCtrl.submitAddForm = function (form) {
            boardCtrl.addForm.submitted = true;
            if (form.$invalid) {
                Alerter.add('Invalid submission, please re-check your entries.', Alerter.DANGER, EXPIRES_IN);
                return;
            }

            function addBoardError(data, status) {
                var msg = 'Unable to add board. ' + ((data.status === JSON_STATUS.ERROR) ? data.message : '');
                console.log(msg, status);
                Alerter.add(msg, Alerter.DANGER, EXPIRES_IN);
            }

            boardCtrl.addBoard(boardCtrl.addForm)
                .success(function (data, status) {
                    if (data.status === JSON_STATUS.SUCCESS) {
                        boardCtrl.boardData.push(data.data.board);
                        Alerter.add('Board Added: "' + boardCtrl.addForm.title + '"', Alerter.SUCCESS, EXPIRES_IN, function () {
                            boardCtrl.resetAddFormData();
                            goDetailState();
                        });
                    } else {
                        addBoardError(data, status);
                    }
                })
                .error(function (data, status) {
                    addBoardError(data, status);
                });
        };
        boardCtrl.resetAddFormData = function () {
            boardCtrl.addForm = {
                title: '',
                desc: null,
                owner: boardCtrl.avatars[0]
            };
        };
        boardCtrl.resetAddFormData();
    });