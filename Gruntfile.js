module.exports = function(grunt) {

  // Utility to load the different option files
  // based on their names
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {

      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });
    return object;
  }

  // Initial config
  var config = {
    pkg: grunt.file.readJSON('package.json')
  };

  // Load tasks from the tasks folder
  grunt.loadTasks('grunt/tasks');

  // Load all the tasks options in tasks/options base on the name:
  // watch.js => watch{}
  
  grunt.util._.extend(config, loadConfig('./grunt/tasks/options/'));

  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('build', ['clean', 'copy', 'stylus', 'autoprefixer']);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('prod', [
      'build',
      'useminPrepare',
      'concat:generated',
      'uglify:generated',
      'cssmin:generated',
      'filerev:js',
      'filerev:css',
      'usemin'
  ]);

  // Moved to the tasks folder:
  grunt.registerTask('dev', ['build', 'connect:dev', 'watch']);

};