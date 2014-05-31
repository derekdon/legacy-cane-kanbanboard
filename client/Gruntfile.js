'use strict';

var shims = require('./shims'),
    sharedModules = Object.keys(shims).concat([
        // Add non shimmed lib modules
        'jquery', 'angular', 'angular-ui-router', 'underscore', 'underscore.string', 'moment'
    ]);

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: {
            app: 'app',
            libsJs: 'libs.js',
            mainJs: 'app/app.js',
            test: 'test',
            dist: 'dist/',
            distJs: 'dist/js/',
            distCss: 'dist/css/',
            less: 'app/common/less/',
            tmp: 'dist/.tmp/',
            jsAll: '/**/*.js',
            lessAll: '/**/*.less',
            jshintrc: '../.jshintrc'
        },
        jshint: {
            options: {
                jshintrc: '<%= path.jshintrc %>'
            },
            files: ['<%= path.app + path.jsAll %>', '<%= path.test + path.jsAll %>']
        },
        browserify: {
            lib: {
                files: {
                    '<%= path.tmp + pkg.name %>.lib.browserifed.js': ['<%= path.libsJs %>']
                },
                options: {
                    transform: ['browserify-shim'],
                    require: sharedModules
                }
            },
            main: {
                files: {
                    '<%= path.tmp + pkg.name %>.main.browserifed.js': ['<%= path.mainJs %>']
                },
                options: {
                    external: sharedModules,
                    browserifyOptions: {
                        paths: ['./node_modules', './app/']
                    },
                    bundleOptions: {
                        debug: true
                    }
                }
            }
        },
        ngmin: {
            dist: {
                src: ['<%= path.tmp + pkg.name %>.main.browserifed.js'],
                dest: '<%= path.tmp + pkg.name %>.ngmin.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    '<%= path.tmp + pkg.name %>.uglified.js': ['<%= ngmin.dist.dest %>']
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= path.tmp + pkg.name %>.lib.browserifed.js', '<%= path.tmp + pkg.name %>.uglified.js'],
                dest: '<%= path.distJs + pkg.name %>.min.js'
            }
        },
        less: {
            styles: {
                files: {
                    '<%= path.distCss + pkg.name %>.css': ['<%= path.app + path.lessAll %>']
                }
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: ['<%= path.tmp %>']
                    }
                ]
            }
        },
        watch: {
            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['default']
            },
            less: {
                files: ['<%= path.app + path.lessAll %>'],
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'browserify', 'ngmin', 'uglify', 'concat', 'less', 'clean']);
};