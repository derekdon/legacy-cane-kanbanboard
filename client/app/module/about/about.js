var aboutModule = angular.module("kanbanboard.module.about", [
    "ui.router"
]);

aboutModule.config(function config($stateProvider) {
    $stateProvider
        .state("about", {
            url: "/about",
            views: {
                "main": {
                    controller: "AboutCtrl",
                    controllerAs: "aboutCtrl",
                    templateUrl: "app/module/about/about.html"
                }
            }
        });
});

aboutModule.controller("AboutCtrl", function () {
    var aboutCtrl = this;
});