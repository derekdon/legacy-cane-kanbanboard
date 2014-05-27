'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'vendor/angular/angular.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/angular-mocks/angular-mocks.js',
            'vendor/underscore/underscore.js',
            'vendor/underscore.string/dist/underscore.string.min.js',
            'vendor/momentjs/min/moment.min.js',
            'app/**/*.js',
            'test/unit/**/*.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: false
    });
};