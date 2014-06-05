'use strict';

var config = require('./config'),
    service = require('./service'),
    ctrl = require('./ctrl');

module.exports = angular.module('kanbanboard.module.ticket', [
        require('common/js/factories').name,
        'ui.router',
        'xeditable'
    ])
    .config(config)
    .service('TicketService', service)
    .controller('TicketCtrl', ctrl);