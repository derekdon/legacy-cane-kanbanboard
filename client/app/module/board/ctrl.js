'use strict';

module.exports = function (BoardService, AvatarService, StageService, Alerter, $state, JSON_STATUS) {

    var boardCtrl = this;
    boardCtrl.boardData = BoardService.boardData;
    boardCtrl.showBoard = BoardService.showBoard;
    boardCtrl.addBoard = BoardService.addBoard;
    boardCtrl.avatars = AvatarService.avatars;
    boardCtrl.stages = StageService.stages;

    // Alerts
    boardCtrl.alerts = Alerter.alerts;
    boardCtrl.removeAlert = Alerter.remove;
    var EXPIRES_IN = 1500;
    var goDetailState = function () {
        $state.go('board.detail');
    };

    boardCtrl.imSureToDestroy = false;
    boardCtrl.destroyBoard = function () {
        BoardService.boardData.length = 0;
        StageService.resetStages();
        boardCtrl.imSureToDestroy = false;
        Alerter.add('Your Kanban Board has been destroyed.', Alerter.INFO, EXPIRES_IN, function () {
            goDetailState();
        });
    };

    boardCtrl.imSureToReset = false;
    boardCtrl.resetBoard = function () {
        StageService.resetStages();
        boardCtrl.imSureToReset = false;
        Alerter.add('Your Kanban Board has been reset.', Alerter.INFO, EXPIRES_IN, function () {
            goDetailState();
        });
    };

    // Add form
    boardCtrl.submitAddForm = function (form) {
        boardCtrl.addForm.submitted = true;
        if (form.$invalid) {
            Alerter.add('Invalid submission, please re-check your entries.', Alerter.DANGER, EXPIRES_IN);
            return;
        }

        function addBoardError(data, status) {
            var msg = 'Unable to add board. ' + ((data.status === JSON_STATUS.ERROR) ? data.message : '');
            console.log(msg, status);
            Alerter.add(msg, Alerter.DANGER, EXPIRES_IN);
        }

        boardCtrl.addBoard(boardCtrl.addForm)
            .success(function (data, status) {
                if (data.status === JSON_STATUS.SUCCESS) {
                    boardCtrl.boardData.push(data.data.board);
                    Alerter.add('Board Added: "' + boardCtrl.addForm.title + '"', Alerter.SUCCESS, EXPIRES_IN, function () {
                        boardCtrl.resetAddFormData();
                        goDetailState();
                    });
                } else {
                    addBoardError(data, status);
                }
            })
            .error(function (data, status) {
                addBoardError(data, status);
            });
    };
    boardCtrl.resetAddFormData = function () {
        boardCtrl.addForm = {
            title: '',
            desc: null,
            owner: boardCtrl.avatars[0]
        };
    };
    boardCtrl.resetAddFormData();
};