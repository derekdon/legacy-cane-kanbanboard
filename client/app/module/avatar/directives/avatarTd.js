'use strict';

module.exports = function () {
    return {
        restrict: 'A',
        scope: {
            handles: '='
        },
        template: '<img class="avatar-img" src="http://avatars.io/twitter/{{handles.twitter}}">'
    };
};