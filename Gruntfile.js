'use strict';

module.exports = function (grunt) {

    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.style.init(grunt);
    var script = transport.script.init(grunt);
    var bootstrapGenerateCommonJSModule = require('./grunt/bootstrap-bs-commonjs-generator.js');
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        copy: {
            // assets 为静态文件的目录，存放编译打包后的js&css
            // 为了避免transport解析错误凡是在alias中配置的需要事先cp到assets下面
            /*
             * sea直接cp到assets
            */
            sea: {
                files: [{
                    expand: true,
                    cwd: 'lib/',
                    src: ['sea.js', 'seajs-style/**'],
                    dest: 'assets'
                }]
            },
            $: {
                files: [{
                    expand: true,
                    cwd: 'lib/',
                    src: ['jquery-1.11.1.min.js'],
                    dest: 'assets'
                }]
            },
            /*
             * jquery ui 直接cp到assets
             */
            jqueryui: {
                files: [{
                    expand: true,
                    cwd: 'lib/',
                    src: ['jquery-ui/1.4.2/**/*'],
                    dest: 'assets'
                }]
            }
        },
        transport: {
            options: {
                debug: false,
                alias: '<%= pkg.alias %>',
                parsers: {
                    '.js': [script.jsParser],
                    '.css': [style.css2jsParser]
                },
                paths: ['assets']
            }
        },
        less: {
            bootstrap_compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap.css.map',
                    sourceMapFilename: 'assets/bootstrap/3.3.2/bootstrap.css.map'
                },
                src: 'lib/bootstrap/3.3.2/less/bootstrap.less',
                dest: 'assets/bootstrap/3.3.2/bootstrap-debug.css'
            },
            bootstrap_compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap-theme.css.map',
                    sourceMapFilename: 'assets/bootstrap/3.3.2/bootstrap-theme.css.map'
                },
                src: 'lib/bootstrap/3.3.2/less/theme.less',
                dest: 'assets/bootstrap/3.3.2/bootstrap-theme-debug.css'
            }
        },
        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            bootstrap_core: {
                options: {
                    map: true
                },
                src: 'assets/bootstrap/3.3.2/bootstrap-debug.css'
            },
            bootstrap_theme: {
                options: {
                    map: true
                },
                src: 'assets/bootstrap/3.3.2/bootstrap-theme-debug.css'
            }
        },
        css_import: {
            compress: {
                files: {
                    'assets/global/1.0.0/global.css': ['static/css/global/1.0.0/global.css'],
                    'assets/global/2.0.0/global.css': ['static/css/global/2.0.0/global.css']
                }
            }
        },
        cssmin: {
            options: {
                //keepSpecialComments: 0
            },
            minify: {
                expand: true,
                cwd: 'assets/',
                src: ['global/**/global.css'],
                dest: 'assets/',
                ext: '.css'
            },
            bootstrap_minifyCore: {
                src: 'assets/bootstrap/3.3.2/bootstrap-debug.css',
                dest: 'assets/bootstrap/3.3.2/bootstrap.css'
            },
            bootstrap_minifyTheme: {
                src: 'assets/bootstrap/3.3.2/bootstrap-theme-debug.css',
                dest: 'assets/bootstrap/3.3.2/bootstrap-theme.css'
            }
        },
        csscomb: {
            options: {
            },
            bootstrap: {
                options: {
                    config: 'less/.csscomb.json'
                },
                expand: true,
                cwd: 'assets/bootstrap/3.3.2',
                src: ['*.css', '!*-debug.css'],
                dest: 'assets/bootstrap/3.3.2/'
            }
        },
        concat: {
            options: {
                paths: ['.'],
                separator: ';'
            },
            commonjs: {
                options: {
                    noncmd: true
                },
                files: {
                    'assets/common/1.0.0/common.js': [
                        'static/js/common/1.0.0/common.js'
                    ]
                }
            },
            tabpanel: {
                options: {
                    noncmd: true
                },
                files: {
                    'assets/tabpanel/1.0.0/tabpanel.js': [
                        'static/js/tabpanel/1.0.0/Fader.js',
                        'static/js/tabpanel/1.0.0/TabPanel.js',
                        'static/js/tabpanel/1.0.0/Math.uuid.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            compress: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['common/**/*.js'],
                    dest: 'assets/'
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: 'jshint/.jshintrc'
            },
            assets: {
                src: ['lib/*.js', 'lib/**/**/*.js', 'static/js/**/**/*.js']
            }
        },
        clean: {
            temp: []
        },
        watch: {
            style: {
                files: ['static/css/**/*.css'],
                tasks: ['cssmin', 'css_import']
            },
            scripts: {
                files: ['lib/**/**/*.js', 'static/js/**/**/*.js'],
                tasks: ['transport', 'concat', 'uglify']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-css-import');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // other js
    grunt.registerTask('other-dist-js', ['concat:commonjs', 'concat:tabpanel']);
    // bootstrap css
    grunt.registerTask('bootstrap-less-compile', ['less:bootstrap_compileCore', 'less:bootstrap_compileTheme']);
    grunt.registerTask('bootstrap-dist-css', ['bootstrap-less-compile', 'autoprefixer:bootstrap_core', 'autoprefixer:bootstrap_theme', 'csscomb:bootstrap', 'cssmin:bootstrap_minifyCore', 'cssmin:bootstrap_minifyTheme']);
    // other css
    grunt.registerTask('other-dist-css', ['css_import', 'cssmin:minify']);
    // other
    grunt.registerTask('other', ['copy', 'transport']);
    // Full
    grunt.registerTask('default', ['other', 'other-dist-js', 'bootstrap-dist-css', 'other-dist-css']);

};
