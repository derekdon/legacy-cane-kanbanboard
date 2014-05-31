'use strict';

module.exports = angular.module('kanbanboard.common.configuration', [])
    .constant('VERSION', require('../../../../package.json').version)
    .constant('API', 'http://api.derekdonnelly.com/kanban/')
    .constant('HOME', '/board/show/')
    .constant('JSON_STATUS', {
        ERROR: 'error',
        SUCCESS: 'success'
    });