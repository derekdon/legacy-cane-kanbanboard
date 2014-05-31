'use strict';

module.exports = angular.module('kanbanboard.module.stage', [
        require('common/js/factories').name,
        'ui.router'
    ])
    .config(function config($stateProvider) {
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
    })
    .service('StageService', function ($q, $timeout) {
        var service = this,
            JSONTYPE = 'stage';

        // Test data, won't be read from here normally
        service.defaultStages = [
            {
                id: 'stage::backlog',
                jsonType: 'stage',
                title: {
                    en: 'Backlog'
                },
                displayedOnBoard: false
            },
            {
                id: 'stage::dev-ready-queue',
                jsonType: 'stage',
                title: {
                    en: 'Dev Ready Queue'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::back-from-qa',
                jsonType: 'stage',
                title: {
                    en: 'Back from QA'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::spec',
                jsonType: 'stage',
                title: {
                    en: 'Spec'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::spec-review',
                jsonType: 'stage',
                title: {
                    en: 'Spec Review'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::in-dev',
                jsonType: 'stage',
                title: {
                    en: 'In Dev'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::product-ux-review',
                jsonType: 'stage',
                title: {
                    en: 'Product / UX Review'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::resource-review',
                jsonType: 'stage',
                title: {
                    en: 'Resource Review'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::dev-review',
                jsonType: 'stage',
                title: {
                    en: 'Dev Review'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::pending-qa',
                jsonType: 'stage',
                title: {
                    en: 'Pending QA'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::in-qa',
                jsonType: 'stage',
                title: {
                    en: 'In QA'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::qa-passed',
                jsonType: 'stage',
                title: {
                    en: 'QA Passed'
                },
                displayedOnBoard: true
            },
            {
                id: 'stage::resolved',
                jsonType: 'stage',
                title: {
                    en: 'Resolved'
                },
                displayedOnBoard: true
            }
        ];

        service.resetStages = function () {
            var copyOfDefault = service.defaultStages.concat();
            if (service.stages) {
                // Keep reference, but empty and refill
                service.stages.splice(0, service.stages.length);
                copyOfDefault.forEach(function (v) {
                    service.stages.push(v);
                }, this);
            } else {
                service.stages = copyOfDefault;
            }
        };
        service.resetStages();

        service.getStages = function () {
            var d = $q.defer();
            $timeout(function () {
                d.resolve(service.stages);
            }, 2000);
            return d.promise;
        };

        service.addStage = function (spec) {

            var newStage = {
                jsonType: JSONTYPE,
                title: {
                    en: spec.title
                },
                displayedOnBoard: spec.displayedOnBoard
            };

            service.stages.push(newStage);
        };
    })
    .controller('StageCtrl', function (StageService, Alerter, $state) {

        var stageCtrl = this;
        stageCtrl.addStage = StageService.addStage;
        stageCtrl.stages = StageService.stages;
        stageCtrl.displayedOnBoard = true; // Add stage default

        // Alerts
        stageCtrl.alerts = Alerter.alerts;
        stageCtrl.removeAlert = Alerter.remove;
        var EXPIRES_IN = 1500;
        var goStageListState = function () {
            $state.go('stage.list');
        };

        stageCtrl.imSureToReset = false;
        stageCtrl.resetStages = function () {
            StageService.resetStages();
            stageCtrl.imSureToReset = false;
            Alerter.add('Your Workflow Stages have been reset.', Alerter.INFO, EXPIRES_IN, function () {
                goStageListState();
            });
        };

        // Add form
        stageCtrl.submitAddForm = function (form) {
            var EXPIRES_IN = 1500;
            stageCtrl.addForm.submitted = true;
            if (form.$invalid) {
                Alerter.add('Invalid submission, please re-check your entries.', Alerter.DANGER, EXPIRES_IN);
                return;
            }
            stageCtrl.addStage(stageCtrl.addForm);
            Alerter.add('Workflow Stage Added: "' + stageCtrl.addForm.title + '"', Alerter.SUCCESS, EXPIRES_IN, stageCtrl.resetAddFormData);
        };
        stageCtrl.resetAddFormData = function () {
            stageCtrl.addForm = {
                title: '',
                displayedOnBoard: true
            };
        };
        stageCtrl.resetAddFormData();
    })
    .directive('stageTableRows', function () {
        return function (scope, element) {
            var tbody = element[0];
            scope.stageCtrl.sortable = new Sortable(tbody, {
                group: 'stages',
                draggable: 'tr',
                onAdd: function (evt) {
                    console.log('onAdd.stageTableRows:', evt.item);
                },
                onUpdate: function (evt) {

                    console.log('onUpdate.stageTableRows:', evt.item);

                    var startIndex = scope.stageCtrl.sortStartIndex,
                        endIndex = evt.item.sectionRowIndex,
                        stages = scope.stageCtrl.stages;

                    console.log('startIndex: ' + startIndex);
                    console.log('endIndex: ' + endIndex);

                    stages.splice(endIndex, 0, stages.splice(startIndex, 1)[0]);
                },
                onRemove: function (evt) {
                    console.log('onRemove.stageTableRows:', evt.item);
                }
            });
        };
    })
    .directive('sortableRow', function () {
        return function (scope, element) {

            var tr = element[0];
            tr.style.cursor = 'move';

            function captureStartIndex() {
                scope.stageCtrl.sortStartIndex = tr.sectionRowIndex;
            }

            element.bind('mousedown', captureStartIndex);
            element.bind('touchstart', captureStartIndex);
            element.bind('selectstart', captureStartIndex);
        };
    });