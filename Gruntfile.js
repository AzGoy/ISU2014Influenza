module.exports = function(grunt){

   'use strict';
   require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'build/css/main.css': 'build/css/main.css'
                }
            }
        },

        cssmin: {
            options: {
                banner: '/*! CSS by Jared Cubilla. Last minified on <%= grunt.template.date("dddd, mmmm dS, yyyy, h:MM:ss TT") %>. */\n'
            },
            build: {
                src: 'assets/css/main.css',
                dest: 'build/css/main.css'
            }
        },

        sass: {
            build: {
                files: {
                    'assets/css/main.css': 'assets/sass/concat.scss'
                }
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'src-not-empty': true, 
                    'head-script-disabled': true,
                    'style-disabled': true,
                    'img-alt-require': true
                    
                },
                src: ['*.html']
            }
        },

        uglify: {
            build: {
                files: {
                    'build/js/main.min.js': ['build/js/main.js']
                }
            }
        },
        jshint: {
            src: ['*.js', 'assets/js/*.js'],
            options: {
                curly: true,
                camelcase: true,
                eqeqeq: true,
                immed: true,
                indent: 4,
                quotmark: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                devel: true,
                globals: {
                    require: true,
                    module: true
                }
            }  
        },
        concat: {
            js: {
                options: {
                  separator: ';',  
                },
                files: {
                    'build/js/main.js': ['assets/js/*.js', '!assets/js/concat.js'],
                },
            },
            scss: {
                files: {
                    'assets/sass/concat.scss': ['assets/sass/*.scss', '!assets/sass/concat.scss'],
                },
            },
        },
        scsslint: {
            dist: {
                src: ['assets/sass/extra.scss', '!assets/sass/concat.scss'],
            }
        },
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.png'],
                    dest: 'build/img/',
                    ext: '.png'
                }]
            },
            jpg: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.jpg'],
                    dest: 'build/img/',
                    ext: '.jpg'
                }],
            },
            gif: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.gif'],
                    dest: 'build/img/',
                    ext: '.gif'
                }],
            },
        }

    });
    
    grunt.registerTask('lint' , ['htmlhint', 'jshint', 'scsslint']);
    grunt.registerTask('buildcss',  ['concat:scss', 'sass', 'cssc', 'cssmin']);
    grunt.registerTask('buildjs', ['concat:js','uglify']);
    
    grunt.registerTask('default',   ['lint', 'buildcss', 'buildjs', 'imagemin']);

};