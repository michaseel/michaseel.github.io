/* ---------------------- */
/* nx-bootstrap Gruntfile */
/* v0.0.3 by mseel        */
/* ---------------------- */
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);


  // configurable paths
  var folders = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp'
  };

  //language variable
  if(typeof grunt.option( "language" ) === "undefined") {
    var language = "de"; }
  else {
    var language = grunt.option( "language" ); }

  grunt.initConfig({
    folders: folders,
    watch: {
      less: {
        files: ['<%= folders.app %>/styles/**/*.less'],
        tasks: ['less:server']
      },
      server: {
        options: {
          livereload: true
        },
        files: [
          '<%= folders.tmp %>/*.html',
          '<%= folders.tmp %>/styles/{,*/}*.css',
          '<%= folders.app %>/scripts/{,*/}*.js',
          '<%= folders.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      jade: {
        files: ['<%= folders.app %>/jade/**/*.jade', '!**/_*'],
        tasks: ['newer:jade']
      },
      jadeincludes: {
        files: '<%= folders.app %>/jade/**/_*.jade',
        tasks: ['jade']
      },
      content: {
        files: '<%= folders.app %>/content/**/*.json',
        tasks: ['jade']
      }

    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: null
      },
      server: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, folders.tmp),
              mountFolder(connect, folders.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, folders.tmp),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, folders.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= folders.tmp %>',
            '<%= folders.dist %>/*',
            '!<%= folders.dist %>/.git*'
          ]
        }]
      },
      server: '<%= folders.tmp %>'
    },

    less: {
      options: {
          paths: ['<%= folders.app %>/styles'],
      },
      dist: {
          options: {
              //yuicompress: true,
              //report: 'gzip'
          },
          files: [{
            expand: true,
            cwd: '<%= folders.app %>/styles',
            src: ['{,*/}*.less', '!**/_*'],
            dest: '.tmp/styles',
            ext: '.css'
          }],
      },
      server: {
          options: {
              dumpLineNumbers: 'all'
          },
          files: [{
            expand: true,
            cwd: '<%= folders.app %>/styles',
            src: ['{,*/}*.less', '!**/_*'],
            dest: '.tmp/styles',
            ext: '.css'
          }],
      },
    },

    jade: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/jade',
          src: ['{,*/}*.jade', '!**/_*'],
          dest: '.tmp/',
          ext: '.html'
        }],
        options: {
          client: false,
          pretty: true,
          basedir: '<%= folders.app %>/jade',
          data: function (dest, src) {
            var page = src[0].replace('app/jade/', ' ');
            page = page.replace('.jade','');
            page = page.replace(/\//g,' ');

            return {
              page: page,
              lang: grunt.file.readJSON("app/content/"+ language +".json"),
              language: language,
              timestamp: grunt.template.today('dd.mm.yyyy HH:MM:ss')
            };
          }
        }
      }
    },

    useminPrepare: {
      html: '<%= folders.tmp %>/index.html',
      options: {
        dest: '<%= folders.dist %>'
      }
    },
    usemin: {
      html: ['<%= folders.dist %>/{,*/}*.html'],
      css: ['<%= folders.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= folders.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= folders.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= folders.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= folders.dist %>/styles/main.css': [
            '<%= folders.tmp %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/folders/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= folders.tmp %>',
          src: '{,*/}*.html',
          dest: '<%= folders.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'json/{,*/}*.json',
            'images/{,*/}*.{webp,gif,png,svg,jpg,jpeg}',
            'styles/fonts/*'
          ]
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.tmp %>',
          src: ['scripts/**/*js', '!**/_*'],
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.tmp %>',
          src: [
            'styles/{,*/}*css',
            'bower_components/**/*min.css'
          ]
        }]
      },
      assets: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.dist %>',
          src: [
            'assets/{,*/}*.*'
          ]
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.dist %>',
          src: [
            'images/{,*/}*.*'
          ]
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.dist %>',
          src: [
            'fonts/**'
          ]
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: '<%= folders.tmp %>',
          dest: '<%= folders.dist %>',
          src: [
            '*.html'
          ]
        }]
      },
      deploy: {
        files: [{
          expand: true,
          cwd: '<%= folders.dist %>',
          dest: './',
          src: [
            '**'
          ]
        }]
      }
    },
    concurrent: {
      server: [
        'less:server',
        'jade'
      ],
      test: [
        'less'
      ],
      dist: [
        'jade',
        'less:dist',
        'copy:js',
        'copy:dist',
        'copy:fonts'
        //'imagemin',
        //'svgmin',
      ]
    },
    cmq: {
      options: {
        log: true
      },
      dist: {
        files: {
          '<%= folders.tmp %>/concat/styles/': [
            '<%= folders.tmp %>/concat/styles/{,*/}*.css'
          ]
        }
      }
    },

  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:server',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'useminPrepare',
    'copy:html',
    'concat',
    'uglify',
    'cmq',
    //'htmlmin',
    'cssmin',
    'usemin',
    'copy:deploy'
  ]);


  grunt.registerTask('default', [
    //'jshint',
    //'test',
    'build'
  ]);
};
