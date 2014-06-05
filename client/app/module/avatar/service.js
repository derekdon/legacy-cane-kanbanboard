'use strict';

var moment = require('moment');

module.exports = function (CBDocService) {

    var service = this,
        JSONTYPE = 'avatar';

    service.showAvatar = function (id) {
        return CBDocService.showItem(id, JSONTYPE);
    };

    service.addAvatar = function (spec) {

        var newAvatar = {
            jsonType: JSONTYPE,
            alias: spec.alias,
            fullName: spec.fullName,
            email: spec.email || '',
            team: spec.team || '',
            role: spec.role || '',
            active: true,
            created: +moment(),
            avatarHandles: spec.avatarHandles || {}
        };

        // Need to hook up actually adding it to the db
        // To match what's already in the array, this would need to be {avatar: newAvatar, userFields: map}
        this.avatarData.push(newAvatar);
    };

    // Test data, won't be read from here normally
    service.avatars = [
        {
            id: 'user::123123123',
            jsonType: 'user',
            alias: 'UI Dev Team',
            fullName: 'UI Dev Team',
            email: 'uidevteam@companyXYZ.com',
            team: 'ui-dev',
            role: 'team',
            active: true,
            note: 'New tickets are assigned to me by default',
            avatarHandles: {
                twitter: '@angularjs'
            },
            displayOnBoard: false,
            created: +moment()
        },
        {
            id: 'user::9645645467',
            jsonType: 'user',
            alias: 'derekdon',
            fullName: 'Derek Donnelly',
            email: 'derek@derekdonnelly.com',
            team: 'ui-dev',
            role: 'developer',
            active: true,
            avatarHandles: {
                twitter: '@derekdon'
            },
            displayOnBoard: true,
            created: +moment()
        },
        {
            id: 'user::234687897',
            jsonType: 'user',
            alias: 'Spanton',
            fullName: 'Mr. Spanton',
            email: 'spanton@spanton.com',
            team: 'ui-dev',
            role: 'developer',
            active: true,
            avatarHandles: {
                twitter: '@megastoat'
            },
            displayOnBoard: true,
            created: +moment()
        }
    ];
};