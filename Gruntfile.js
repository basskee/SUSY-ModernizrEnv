module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      // Sass task
      sass: {

          build: {
              options: {
                  outputStyle: 'compressed'
              },
              files: {
                  'css/style.css': 'scss/style.scss'
              }
          },

          dev: {
              options: {
                  outputStyle: 'expanded',
                  sourceMap: true
              },
              files: {
                  'css/style.css': 'scss/main.scss'
              }
          }
      },
    //Uglify Task  
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

  // Post css
  postcss: {
      options: {
          map: true, // inline sourcemaps

          processors: [
              require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          ]
      },
      dist: {
          src: 'css/style.css'
      }
  },

  // Watch task
  watch: {
      css: {
          options: {
              livereload: true
          },
          files: ['scss/**/*.scss'],
          tasks: ['sass:dev','postcss']
      }
  },

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks("grunt-modernizr");

  // register task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['sass:dev','postcss']);
  grunt.registerTask('build', ['sass:build','postcss']);

};