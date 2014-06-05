'use strict';

var moment = require('moment'),
    _ = require('underscore');

module.exports = function (CBDocService, StageService, $q) {

    var service = this,
        JSONTYPE = 'board';

    service.boardData = [];

    service.showBoard = function (id) {
        return CBDocService.getItem(id, JSONTYPE);
    };

    service.showBoardChained = function (id) {
        var combinedData = {},
            boardPromise = service.showBoard(id);

        return $q.all({board: boardPromise}).then(function (res) {

            console.log(res.board); // This might need to be res.data.board

            return _.extend(combinedData, {
                board: res.board
            });
        });
    };

    service.addBoard = function (spec) {

        var newBoard = {
            jsonType: JSONTYPE,
            title: {
                en: spec.title
            },
            desc: spec.desc,
            owner: spec.owner,
            created: +moment(),
            stages: StageService.stages,
            branchLanes: [
                'branch::master',
                'branch::release'
            ]
        };

        return CBDocService.createItem(newBoard);
    };
};