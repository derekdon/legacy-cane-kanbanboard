var analyticsModule = angular.module("kanbanboard.module.analytics", [
    "ui.router"
]);

analyticsModule.config(function config($stateProvider) {
    $stateProvider
        .state("analytics", {
            url: "/analytics",
            views: {
                "main": {
                    controller: "AnalyticsCtrl",
                    controllerAs: "analyticsCtrl",
                    templateUrl: "app/module/analytics/analytics.html"
                }
            }
        });
});

analyticsModule.controller("AnalyticsCtrl", function () {
    var analyticsCtrl = this;
});