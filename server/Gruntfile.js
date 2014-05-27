'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['init.js', 'server.js', 'Gruntfile.js', 'module/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '../.jshintrc'
            }
        },
        nodeunit: ['test/**/*.js'],
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'nodeunit']
        }
    });

    grunt.registerTask('default', ['jshint', 'nodeunit']);
    grunt.registerTask('test', ['jshint', 'nodeunit']);
};