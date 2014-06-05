'use strict';

var config = require('./config'),
    service = require('./service'),
    ctrl = require('./ctrl'),
    dirStageTableRows = require('./directives/stageTableRows'),
    dirSortableRow = require('./directives/sortableRow');

module.exports = angular.module('kanbanboard.module.stage', [
        require('common/js/factories').name,
        'ui.router'
    ])
    .config(config)
    .service('StageService', service)
    .controller('StageCtrl', ctrl)
    .directive('stageTableRows', dirStageTableRows)
    .directive('sortableRow', dirSortableRow);