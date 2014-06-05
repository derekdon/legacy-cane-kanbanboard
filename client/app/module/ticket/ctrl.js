'use strict';

module.exports = function ($scope, TicketService, AvatarService, StageService, Alerter, $state, $stateParams) {

    var ticketCtrl = this;
    ticketCtrl.ticketData = TicketService.ticketData;
    ticketCtrl.showTicket = TicketService.showTicket;
    ticketCtrl.addTicket = TicketService.addTicket;
    ticketCtrl.avatars = AvatarService.avatars;
    ticketCtrl.stages = StageService.stages;
    ticketCtrl.ticketTypes = TicketService.ticketTypes;

    console.log('$stateParams ' + $stateParams);

    ticketCtrl.selectTicket = function (ticket) {
        ticketCtrl.selectedTicket = ticket;
        ticketCtrl.selectedTicketCopy = angular.copy(ticket);

        $state.go('ticket.detail');
    };

    ticketCtrl.saveTicket = function () {
        ticketCtrl.selectedTicket.someValue = ticketCtrl.selectedTicketCopy.someValue;
    };

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
};