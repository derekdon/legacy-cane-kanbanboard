'use strict';

var config = require('./config'),
    service = require('./service'),
    ctrl = require('./ctrl'),
    dirAvatarTd = require('./directives/avatarTd');

module.exports = angular.module('kanbanboard.module.avatar', [
        'ui.router'
    ])
    .config(config)
    .service('AvatarService', service)
    .controller('AvatarCtrl', ctrl)
    .directive('avatarTd', dirAvatarTd);