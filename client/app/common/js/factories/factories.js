var commonFactories = angular.module("kanbanboard.common.factories", []);

commonFactories.factory("Alerter", function ($timeout) {

    var Alerter = {},
        alerts = [];

    Alerter.alerts = function () {
        return alerts;
    };

    Alerter.add = function (msg, type, expiresIn, expireCB) {
        var alert = {
            msg: msg,
            type: type,
            expiresIn: expiresIn
        }
        alerts.push(alert);

        if (angular.isNumber(expiresIn)) {
            $timeout(function () {
                Alerter.remove(alert);
                if(angular.isFunction(expireCB)) {
                    expireCB(alert);
                }
            }, expiresIn);
        }
    };

    Alerter.addAlert = function (alert) {
        alerts.push(alert);
    };

    Alerter.remove = function (alert) {
        alerts.splice(alerts.indexOf(alert), 1);
    };

    Alerter.removeAll = function () {
        alerts = [];
    };

    // Default types
    Alerter.SUCCESS = "success";
    Alerter.INFO = "info";
    Alerter.WARNING = "warning";
    Alerter.DANGER = "danger";

    return Alerter;
});