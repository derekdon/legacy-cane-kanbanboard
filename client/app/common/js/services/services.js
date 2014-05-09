var commonServices = angular.module("kanbanboard.common.services", [
    "kanbanboard.common.configuration"
]);

commonServices.service("CBDocService", function ($http, API) {
    var service = this,
        showUrlTemplate = _.template(API + "<%= jsonType %>/show/");

    service.showItem = function (id, jsonType) {
        return $http.get(showUrlTemplate({jsonType: jsonType}) + id);
    }
});