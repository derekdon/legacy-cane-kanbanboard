'use strict';

var pkg = require('./package.json');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            './node_modules/angular/lib/angular.min.js',
            './node_modules/angular-ui-router/release/angular-ui-router.min.js',
            pkg.browser.ngMocks,
            './node_modules/underscore/underscore-min.js',
            './node_modules/underscore.string/dist/underscore.string.min.js',
            './node_modules/moment/min/moment.min.js',
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