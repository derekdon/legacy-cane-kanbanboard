module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-ngmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        path: {
            app: "app",
            test: "test",
            dist: "dist/",
            distJs: "dist/js/",
            distCss: "dist/css/",
            less: "app/common/less/",
            tmp: "dist/.tmp/",
            jsAll: "/**/*.js",
            lessAll: "/**/*.less",
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
                    "<%= path.distJs + pkg.name %>.min.js": ["<%= ngmin.dist.dest %>"]
                }
            }
        },
        less: {
            styles: {
                files: {
                    "<%= path.distCss + pkg.name %>.css": ["<%= path.app + path.lessAll %>"]
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
            scripts: {
                files: ["<%= jshint.files %>"],
                tasks: ["default"]
            },
            less: {
                files: ["<%= path.app + path.lessAll %>"],
                tasks: ["less"]
            }
        }
    });

    grunt.registerTask("default", ["jshint", "concat", "ngmin", "uglify", "less", "clean"]);
};