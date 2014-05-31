'use strict';

var moment = require('moment'),
    _ = require('underscore');

module.exports = angular.module('kanbanboard.common.filters', [])
    .filter('truncate', function () {
        return function (text, length, chars) {
            return _.str.truncate(text, length, chars);
        };
    })
    .filter('timeAgo', function () {
        return function (timestamp) {
            return moment(timestamp).fromNow();
        };
    })
    .filter('timeFormat', function () {
        return function (timestamp) {
            return moment(timestamp).format('dddd, MMMM Do YYYY');
        };
    })
    .filter('calendarFormat', function () {
        return function (timestamp) {
            return moment(timestamp).calendar();
        };
    })
    .filter('capitalize', function () {
        return function (text) {
            return _.str.capitalize(text);
        };
    })
    .filter('joinProps', function () {
        return function (obj, prop, separator) {

            if (angular.isUndefined(obj) || angular.isUndefined(prop)) {
                return obj;
            }
            else if (angular.isArray(obj)) {
                var output = [];
                _.each(obj, function (o) {
                    output.push(o[prop]);
                });
                return output.join(separator || ', ');
            }

            return angular.isObject(obj) ? obj[prop] || obj : obj;
        };
    });