'use strict';

var pkg = require('../../../../package.json');

exports = angular.module('kanbanboard.common.configuration', [])
    .constant('VERSION', pkg.version)
    .constant('API', 'http://api.derekdonnelly.com/kanban/')
    .constant('HOME', '/board/show/')
    .constant('JSON_STATUS', {
        ERROR: 'error',
        SUCCESS: 'success'
    });