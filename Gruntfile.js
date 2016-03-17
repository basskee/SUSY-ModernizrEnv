(function() {
  'use strict';
}());

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //concat config
    concat: {
      options: {
        separator: '\n'
      },

      dist: {
        src: ['js/modules/module1.js', 'js/modules/module2.js'],
        dest: 'js/main.js'
      }
    },

    //Uglify config
    uglify: {
      options: {
        banner: '/*! &lt;%= pkg.name %&gt; &lt;%= grunt.template.today("dd-mm-yyyy") %&gt; */n'
      },
      dist: {
        files: {
          'js/main.min.js': ['&lt;%= concat.dist.dest %&gt;']
        }
      }
    },
    //JSHint config
    jshint: {
      files: ['gruntfile.js', 'js/*.js', 'js/modules/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    //Concatenate and Compress SCSS: SCSS folder to CSS folder
    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          environment: 'development',
          outputStyle: 'compressed'
        }
      }
    },
    //Automate the scripts
    watch: {
      files: ['&lt;%= jshint.files %&gt;', 'scss/**/*.scss'],
      tasks: ['concat', 'uglify', 'jshint', 'compass']
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // register task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'compass','watch']);

};