'use strict';

var config = require('./config'),
    service = require('./service'),
    ctrl = require('./ctrl');

module.exports = angular.module('kanbanboard.module.board', [
        require('common/js/config').name,
        require('common/js/factories').name,
        require('common/js/services').name,
        'ui.router'
    ])
    .config(config)
    .service('BoardService', service)
    .controller('BoardCtrl', ctrl);