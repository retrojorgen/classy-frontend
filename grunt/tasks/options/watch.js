module.exports = {
  options: {
    livereload: true
  },
  scripts: {
    files: ['source/scripts/js/**/*.js'],
    tasks: ['clean:js', 'copy:js'],
    options: {
      spawn: false,
    }
  },
  html: {
    files: ['source/views/**/*.html'],
    tasks: ['clean:html', 'copy:html'],
    options: {
      spawn: false
    }
  },
  stylus: {
    files: ['source/stylus/**/*.styl'],
    tasks: ['clean:css', 'stylus:dev'],
    options: {
      spawn: false
    }
  },
  testdata: {
    files: ['source/testdata/*.json'],
    tasks: ['clean:testdata', 'copy:testdata'],
    options: {
      spawn: false
    }
  },
  libraries: {
    files: ['source/libraries/**'],
    tasks: ['clean:libraries', 'copy:libraries'],
    options: {
      spawn: false
    }
  },
  images: {
    files: ['source/images/**'],
    tasks: ['clean:images', 'copy:images'],
    options: {
      spawn: false
    }
  },
  root: {
    files: ['source/*.html'],
    tasks: ['clean:root', 'copy:root'],
    options: {
      spawn: false
    }
  }
};