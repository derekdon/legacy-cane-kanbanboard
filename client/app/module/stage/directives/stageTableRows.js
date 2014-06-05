'use strict';

module.exports = function () {
    return function (scope, element) {
        var tbody = element[0];
        scope.stageCtrl.sortable = new Sortable(tbody, {
            group: 'stages',
            draggable: 'tr',
            onAdd: function (evt) {
                console.log('onAdd.stageTableRows:', evt.item);
            },
            onUpdate: function (evt) {

                console.log('onUpdate.stageTableRows:', evt.item);

                var startIndex = scope.stageCtrl.sortStartIndex,
                    endIndex = evt.item.sectionRowIndex,
                    stages = scope.stageCtrl.stages;

                console.log('startIndex: ' + startIndex);
                console.log('endIndex: ' + endIndex);

                stages.splice(endIndex, 0, stages.splice(startIndex, 1)[0]);
            },
            onRemove: function (evt) {
                console.log('onRemove.stageTableRows:', evt.item);
            }
        });
    };
};