'use strict';

var moment = require('moment');

module.exports = function (CBDocService, AvatarService) {

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
};