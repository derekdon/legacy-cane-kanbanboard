'use strict';

module.exports = function ($q, $timeout) {
    var service = this,
        JSONTYPE = 'stage';

    // Test data, won't be read from here normally
    service.defaultStages = [
        {
            id: 'stage::backlog',
            jsonType: 'stage',
            title: {
                en: 'Backlog'
            },
            displayedOnBoard: false
        },
        {
            id: 'stage::dev-ready-queue',
            jsonType: 'stage',
            title: {
                en: 'Dev Ready Queue'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::back-from-qa',
            jsonType: 'stage',
            title: {
                en: 'Back from QA'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::spec',
            jsonType: 'stage',
            title: {
                en: 'Spec'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::spec-review',
            jsonType: 'stage',
            title: {
                en: 'Spec Review'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::in-dev',
            jsonType: 'stage',
            title: {
                en: 'In Dev'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::product-ux-review',
            jsonType: 'stage',
            title: {
                en: 'Product / UX Review'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::resource-review',
            jsonType: 'stage',
            title: {
                en: 'Resource Review'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::dev-review',
            jsonType: 'stage',
            title: {
                en: 'Dev Review'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::pending-qa',
            jsonType: 'stage',
            title: {
                en: 'Pending QA'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::in-qa',
            jsonType: 'stage',
            title: {
                en: 'In QA'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::qa-passed',
            jsonType: 'stage',
            title: {
                en: 'QA Passed'
            },
            displayedOnBoard: true
        },
        {
            id: 'stage::resolved',
            jsonType: 'stage',
            title: {
                en: 'Resolved'
            },
            displayedOnBoard: true
        }
    ];

    service.resetStages = function () {
        var copyOfDefault = service.defaultStages.concat();
        if (service.stages) {
            // Keep reference, but empty and refill
            service.stages.splice(0, service.stages.length);
            copyOfDefault.forEach(function (v) {
                service.stages.push(v);
            }, this);
        } else {
            service.stages = copyOfDefault;
        }
    };
    service.resetStages();

    service.getStages = function () {
        var d = $q.defer();
        $timeout(function () {
            d.resolve(service.stages);
        }, 2000);
        return d.promise;
    };

    service.addStage = function (spec) {

        var newStage = {
            jsonType: JSONTYPE,
            title: {
                en: spec.title
            },
            displayedOnBoard: spec.displayedOnBoard
        };

        service.stages.push(newStage);
    };
};