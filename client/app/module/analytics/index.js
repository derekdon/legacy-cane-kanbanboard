'use strict';

var config = require('./config'),
    ctrl = require('./ctrl');

module.exports = angular.module('kanbanboard.module.analytics', [
        'ui.router'
    ])
    .config(config)
    .controller('AnalyticsCtrl', ctrl);