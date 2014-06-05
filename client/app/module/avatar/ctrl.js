'use strict';

module.exports = function (AvatarService) {
    var avatarCtrl = this;
    avatarCtrl.showAvatar = AvatarService.showAvatar;
    avatarCtrl.addAvatar = AvatarService.addAvatar;
    avatarCtrl.avatars = AvatarService.avatars;

    // Sorting tabular data
    avatarCtrl.predicate = '-created';
    avatarCtrl.reverse = false;
    avatarCtrl.predicateReverse = function (val) {
        avatarCtrl.predicate = val;
        avatarCtrl.reverse = !avatarCtrl.reverse;
    };
};