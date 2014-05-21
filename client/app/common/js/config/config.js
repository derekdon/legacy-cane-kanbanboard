var commomConfig = angular.module("kanbanboard.common.configuration", []);

commomConfig.constant("API", "http://api.derekdonnelly.com/kanban/");
commomConfig.constant("HOME", "/board/show/");
commomConfig.constant("JSON_STATUS", {
    ERROR: "error",
    SUCCESS: "success"
});