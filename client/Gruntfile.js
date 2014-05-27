'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: {
            app: 'app',
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
            dist: {
                src: ['<%= path.mainJs %>'],
                dest: '<%= path.tmp + pkg.name %>.browserifed.js'
            }
        },
        ngmin: {
            dist: {
                src: ['<%= browserify.dist.dest %>'],
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
                    '<%= path.distJs + pkg.name %>.min.js': ['<%= ngmin.dist.dest %>']
                }
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

    grunt.registerTask('default', ['jshint', 'browserify', 'ngmin', 'uglify', 'less', 'clean']);
};