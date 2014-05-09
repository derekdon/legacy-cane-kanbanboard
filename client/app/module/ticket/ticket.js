var ticketModule = angular.module("kanbanboard.module.ticket", [
    "ui.router"
]);

ticketModule.config(function config($stateProvider) {
    $stateProvider
        .state("ticket", {
            url: "/ticket",
            abstract: true,
            views: {
                "main": {
                    controller: "TicketCtrl",
                    controllerAs: "ticketCtrl",
                    template: '<h1 class="page-header" ng-show="pageTitle">{{pageTitle}}</h1>' +
                                            '<div ui-view />'
                }
            }
        })
        .state("ticket.list", {
            url: "",
            templateUrl: "app/module/ticket/ticket.list.html",
            data: { pageTitle: "Tickets" }
        })
        .state("ticket.new", {
            url: "/new",
            templateUrl: "app/module/ticket/ticket.new.html",
            data: { pageTitle: "Add Ticket" }
        })
        .state("ticket.detail", {
            url: "/:id",
            templateUrl: "app/module/ticket/ticket.detail.html",
            data: { pageTitle: "Ticket" }
        });
});

ticketModule.service("TicketService", function (CBDocService, AvatarService, $q) {

    var service = this,
        JSONTYPE = "ticket";

    service.ticketData = [];

    service.showTicket = function (id) {
        return CBDocService.showItem(id, JSONTYPE);
    }

    service.addTicket = function (spec) {

        // Think about default users...
        spec.author = (angular.isUndefined(spec.author)) ? AvatarService.avatars[0] : spec.author;

        var newTicket = {
            "jsonType": JSONTYPE,
            "ticketType": spec.ticketType,
            "title": spec.title,
            "desc": spec.desc,
            "author": spec.author,
            "created": +moment(),
            "assignee": spec.assignee,
            "stage": spec.stage
        };

        service.ticketData.push(newTicket);
    }

    // Test data, won't be read from here normally
    service.ticketTypes = [
        {
            "id": "ticket::new",
            "jsonType": "ticket",
            "title": {
                "en": "New Functionality"
            },
            "colour": {
                "title": "Yellow",
                "hex": "#ffff00"
            }
        },
        {
            "id": "ticket::refactor",
            "jsonType": "ticket",
            "title": {
                "en": "Infrastructure / Refactoring"
            },
            "colour": {
                "title": "Pink",
                "hex": "#ff6699"
            }
        },
        {
            "id": "ticket::defect",
            "jsonType": "ticket",
            "title": {
                "en": "Functional Defect"
            },
            "colour": {
                "title": "Blue",
                "hex": "#66ffff"
            }
        },
        {
            "id": "ticket::regression",
            "jsonType": "ticket",
            "title": {
                "en": "Regression Found"
            },
            "colour": {
                "title": "Green",
                "hex": "#999933"
            }
        }
    ]
});

ticketModule.controller("TicketCtrl", function (TicketService, AvatarService, StageService, Alerter) {

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

    // Add form
    ticketCtrl.submitAddForm = function (form) {
        var EXPIRES_IN = 1500;
        ticketCtrl.addForm.submitted = true;
        if (form.$invalid) {
            Alerter.add("Invalid submission, please re-check your entries.", Alerter.DANGER, EXPIRES_IN);
            return;
        }
        ticketCtrl.addTicket(ticketCtrl.addForm);
        Alerter.add("Ticket Added: '" + ticketCtrl.addForm.title + "'", Alerter.SUCCESS, EXPIRES_IN, ticketCtrl.resetAddFormData);
    }
    ticketCtrl.resetAddFormData = function () {
        ticketCtrl.addForm = {
            ticketType: ticketCtrl.ticketTypes[0],
            title: "",
            desc: null,
            stage: ticketCtrl.stages[0],
            assignee: ticketCtrl.avatars[0]
        }
    }
    ticketCtrl.resetAddFormData();
});