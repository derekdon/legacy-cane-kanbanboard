'use strict';

module.exports = function config($stateProvider) {
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
};