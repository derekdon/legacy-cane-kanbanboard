'use strict';

module.exports = function () {
    return function (scope, element) {

        var tr = element[0];
        tr.style.cursor = 'move';

        function captureStartIndex() {
            scope.stageCtrl.sortStartIndex = tr.sectionRowIndex;
        }

        element.bind('mousedown', captureStartIndex);
        element.bind('touchstart', captureStartIndex);
        element.bind('selectstart', captureStartIndex);
    };
};