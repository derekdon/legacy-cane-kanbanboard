var kanbanboard = angular.module("kanbanboard", [
    "kanbanboard.common.configuration",
    "kanbanboard.common.directives",
    "kanbanboard.common.factories",
    "kanbanboard.common.filters",
    "kanbanboard.common.services",
    "kanbanboard.module.about",
    "kanbanboard.module.analytics",
    "kanbanboard.module.avatar",
    "kanbanboard.module.board",
    "kanbanboard.module.stage",
    "kanbanboard.module.ticket",
    "ui.router",
    "ui.bootstrap"
]);

kanbanboard.config(function appConfig($stateProvider, $urlRouterProvider, HOME) {
    $urlRouterProvider.otherwise(HOME);
});

kanbanboard.run(function run() {
    console.log("Module dependencies loaded.")
});

kanbanboard.controller("AppCtrl", function ($scope, $location, AvatarService, TicketService, BoardService) {

    var appCtrl = this;
    appCtrl.APP_TITLE = "Kanban Board";

    appCtrl.avatars = AvatarService.avatars;
    appCtrl.ticketData = TicketService.ticketData;
    appCtrl.boardData = BoardService.boardData;

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.pageTitle = angular.isDefined(toState.data) ? toState.data.pageTitle || "" : "";
        $scope.fullPageTitle = _.str.isBlank($scope.pageTitle) ? appCtrl.APP_TITLE : $scope.pageTitle + " | " + appCtrl.APP_TITLE;
    });
});