'use strict';

describe('kanbanboard', function () {

    var module;
    beforeEach(function () {
        module = angular.module('kanbanboard');
    });

    it('should be registered', function () {
        expect(module).not.toBeNull();
    });

    describe('has dependencies', function () {

        var deps;
        var hasModule = function (m) {
            return deps.indexOf(m) >= 0;
        };

        beforeEach(function () {
            deps = module.value('appName').requires;
        });

        // Check dependencies
        it('should have kanbanboard.common.configuration', function () {
            expect(hasModule('kanbanboard.common.configuration')).toBe(true);
        });

        it('should have kanbanboard.common.directives', function () {
            expect(hasModule('kanbanboard.common.directives')).toBe(true);
        });

        it('should have kanbanboard.common.factories', function () {
            expect(hasModule('kanbanboard.common.factories')).toBe(true);
        });

        it('should have kanbanboard.common.filters', function () {
            expect(hasModule('kanbanboard.common.filters')).toBe(true);
        });

        it('should have kanbanboard.common.services', function () {
            expect(hasModule('kanbanboard.common.services')).toBe(true);
        });

        it('should have kanbanboard.module.about', function () {
            expect(hasModule('kanbanboard.module.about')).toBe(true);
        });

        it('should have kanbanboard.module.analytics', function () {
            expect(hasModule('kanbanboard.module.analytics')).toBe(true);
        });

        it('should have kanbanboard.module.avatar', function () {
            expect(hasModule('kanbanboard.module.avatar')).toBe(true);
        });

        it('should have kanbanboard.module.board', function () {
            expect(hasModule('kanbanboard.module.board')).toBe(true);
        });

        it('should have kanbanboard.module.stage', function () {
            expect(hasModule('kanbanboard.module.stage')).toBe(true);
        });

        it('should have kanbanboard.module.ticket', function () {
            expect(hasModule('kanbanboard.module.ticket')).toBe(true);
        });

        it('should have ui.router', function () {
            expect(hasModule('ui.router')).toBe(true);
        });

        it('should have ui.bootstrap', function () {
            expect(hasModule('ui.bootstrap')).toBe(true);
        });
    });
});