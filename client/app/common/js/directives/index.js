'use strict';

exports = angular.module('kanbanboard.common.directives', [])
    .directive('ribbon', function () {
        return {
            restrict: 'E',
            scope: {
                msg: '@',
                url: '@'
            },
            template: '<div class="ribbon"><a href="{{url}}" target="_blank">{{msg}}</a></div>'
        };
    })
    .directive('contenteditable', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('blur', function () {
                    scope.$apply(function () {
                        ctrl.$setViewValue(elm.html());
                    });
                });
                ctrl.$render = function () {
                    elm.html(ctrl.$viewValue);
                };
                ctrl.$setViewValue(elm.html());
            }
        };
    });