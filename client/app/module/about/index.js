'use strict';

var config = require('./config'),
    ctrl = require('./ctrl');

module.exports = angular.module('kanbanboard.module.about', [
        'ui.router'
    ])
    .config(config)
    .controller('AboutCtrl', ctrl);