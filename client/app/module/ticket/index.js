'use strict';

var moment = require('moment');

module.exports = angular.module('kanbanboard.module.ticket', [
        require('common/js/factories').name,
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider
            .state('ticket', {
                url: '/ticket',
                abstract: true,
                views: {
                    'main': {
                        controller: 'TicketCtrl',
                        controllerAs: 'ticketCtrl',
                        template: '<h1 class="page-header" ng-show="pageTitle">{{pageTitle}}</h1>' +
                            '<div ui-view />'
                    }
                }
            })
            .state('ticket.list', {
                url: '',
                templateUrl: 'app/module/ticket/list.html',
                data: { pageTitle: 'Tickets' }
            })
            .state('ticket.new', {
                url: '/new',
                templateUrl: 'app/module/ticket/new.html',
                data: { pageTitle: 'Add Ticket' }
            })
            .state('ticket.detail', {
                url: '/:id',
                templateUrl: 'app/module/ticket/detail.html',
                data: { pageTitle: 'Ticket' }
            });
    })
    .service('TicketService', function (CBDocService, AvatarService) {

        var service = this,
            JSONTYPE = 'ticket';

        service.ticketData = [];

        service.showTicket = function (id) {
            return CBDocService.showItem(id, JSONTYPE);
        };

        service.addTicket = function (spec) {

            // Think about default users...
            spec.author = (angular.isUndefined(spec.author)) ? AvatarService.avatars[0] : spec.author;

            var newTicket = {
                jsonType: JSONTYPE,
                ticketType: spec.ticketType,
                title: spec.title,
                desc: spec.desc,
                author: spec.author,
                created: +moment(),
                assignee: spec.assignee,
                stage: spec.stage,
                due: +moment(spec.due)
            };

            service.ticketData.push(newTicket);
        };

        // Test data, won't be read from here normally
        service.ticketTypes = [
            {
                id: 'ticket::new',
                jsonType: 'ticket',
                title: {
                    en: 'New Functionality'
                },
                colour: {
                    title: 'Yellow',
                    hex: '#ffff00'
                }
            },
            {
                id: 'ticket::refactor',
                jsonType: 'ticket',
                title: {
                    en: 'Infrastructure / Refactoring'
                },
                colour: {
                    title: 'Pink',
                    hex: '#ff6699'
                }
            },
            {
                id: 'ticket::defect',
                jsonType: 'ticket',
                title: {
                    en: 'Functional Defect'
                },
                colour: {
                    title: 'Blue',
                    hex: '#66ffff'
                }
            },
            {
                id: 'ticket::regression',
                jsonType: 'ticket',
                title: {
                    en: 'Regression Found'
                },
                colour: {
                    title: 'Green',
                    hex: '#999933'
                }
            }
        ];
    })
    .controller('TicketCtrl', function ($scope, TicketService, AvatarService, StageService, Alerter) {

        var ticketCtrl = this;
        ticketCtrl.ticketData = TicketService.ticketData;
        ticketCtrl.showTicket = TicketService.showTicket;
        ticketCtrl.addTicket = TicketService.addTicket;
        ticketCtrl.avatars = AvatarService.avatars;
        ticketCtrl.stages = StageService.stages;
        ticketCtrl.ticketTypes = TicketService.ticketTypes;

        // Sorting tabular data
        ticketCtrl.predicate = '-created';
        ticketCtrl.reverse = false;
        ticketCtrl.predicateReverse = function (val) {
            ticketCtrl.predicate = val;
            ticketCtrl.reverse = !ticketCtrl.reverse;
        };

        // Alerts
        ticketCtrl.alerts = Alerter.alerts;
        ticketCtrl.removeAlert = Alerter.remove;

        // Add form date picker
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        // Add form
        ticketCtrl.submitAddForm = function (form) {
            var EXPIRES_IN = 1500;
            ticketCtrl.addForm.submitted = true;
            if (form.$invalid) {
                Alerter.add('Invalid submission, please re-check your entries.', Alerter.DANGER, EXPIRES_IN);
                return;
            }
            ticketCtrl.addTicket(ticketCtrl.addForm);
            Alerter.add('Ticket Added: "' + ticketCtrl.addForm.title + '"', Alerter.SUCCESS, EXPIRES_IN, ticketCtrl.resetAddFormData);
        };
        ticketCtrl.resetAddFormData = function () {
            $scope.today();
            ticketCtrl.addForm = {
                ticketType: ticketCtrl.ticketTypes[0],
                title: '',
                desc: null,
                stage: ticketCtrl.stages[0],
                assignee: ticketCtrl.avatars[0],
                due: $scope.dt
            };
        };
        ticketCtrl.resetAddFormData();
    });