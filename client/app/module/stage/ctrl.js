'use strict';

module.exports = function (StageService, Alerter, $state) {

    var stageCtrl = this;
    stageCtrl.addStage = StageService.addStage;
    stageCtrl.stages = StageService.stages;
    stageCtrl.displayedOnBoard = true; // Add stage default

    // Alerts
    stageCtrl.alerts = Alerter.alerts;
    stageCtrl.removeAlert = Alerter.remove;
    var EXPIRES_IN = 1500;
    var goStageListState = function () {
        $state.go('stage.list');
    };

    stageCtrl.imSureToReset = false;
    stageCtrl.resetStages = function () {
        StageService.resetStages();
        stageCtrl.imSureToReset = false;
        Alerter.add('Your Workflow Stages have been reset.', Alerter.INFO, EXPIRES_IN, function () {
            goStageListState();
        });
    };

    // Add form
    stageCtrl.submitAddForm = function (form) {
        var EXPIRES_IN = 1500;
        stageCtrl.addForm.submitted = true;
        if (form.$invalid) {
            Alerter.add('Invalid submission, please re-check your entries.', Alerter.DANGER, EXPIRES_IN);
            return;
        }
        stageCtrl.addStage(stageCtrl.addForm);
        Alerter.add('Workflow Stage Added: "' + stageCtrl.addForm.title + '"', Alerter.SUCCESS, EXPIRES_IN, stageCtrl.resetAddFormData);
    };
    stageCtrl.resetAddFormData = function () {
        stageCtrl.addForm = {
            title: '',
            displayedOnBoard: true
        };
    };
    stageCtrl.resetAddFormData();
};