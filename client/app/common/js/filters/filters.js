var commonFilters = angular.module("kanbanboard.common.filters", []);

commonFilters.filter("truncate", function () {
    return function (text, length, chars) {
        return _.str.truncate(text, length, chars);
    };
});

commonFilters.filter("timeAgo", function () {
    return function (timestamp) {
        return moment(timestamp).fromNow();
    };
});

commonFilters.filter("capitalize", function () {
    return function (text) {
        return _.str.capitalize(text);
    };
});

// I might need to think about the name of this filter...
commonFilters.filter("joinProps", function () {
    return function (obj, prop, separator) {

        if(angular.isUndefined(obj) || angular.isUndefined(prop)) {
            return obj;
        }
        else if(angular.isArray(obj))
        {
            var output = [];
            _.each(obj, function (o) {
                output.push(o[prop]);
            });
            return output.join(separator || ", ");
        }

        return angular.isObject(obj) ? obj[prop] || obj : obj;
    };
});