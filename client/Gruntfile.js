module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-ngmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        path: {
            app: "app",
            test: "test",
            dist: "dist/",
            tmp: "dist/.tmp/",
            jsAll: "/**/*.js",
            jshintrc: "../.jshintrc"
        },
        jshint: {
            files: ["<%= path.app + path.jsAll %>", "<%= path.test + path.jsAll %>"],
            options: {
                jshintrc: "<%= path.jshintrc %>"
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ["<%= path.app + path.jsAll %>"],
                dest: "<%= path.tmp + pkg.name %>.js"
            }
        },
        ngmin: {
            dist: {
                src: ["<%= concat.dist.dest %>"],
                dest: "<%= path.tmp + pkg.name %>.ngmin.js"
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                     "<%= path.dist + pkg.name %>.min.js": ["<%= ngmin.dist.dest %>"]
                }
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: ["<%= path.tmp %>"]
                    }
                ]
            }
        },
        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["default"]
        }
    });

    grunt.registerTask("default", ["jshint", "concat", "ngmin", "uglify", "clean"]);
};