module.exports = {
  js: {
    expand: true,
    cwd: 'source/scripts/js/',
    src: '**/*.js',
    dest: 'public/assets/scripts/js/'
  },
  html: {
  	expand: true,
    cwd: 'source/views/',
    src: '**/*.html',
    dest: 'public/assets/views/'
  },
  images: {
    expand: true,
    cwd: 'source/images/',
    src: '**/*.*',
    dest: 'public/assets/images/'
  },
  libraries: {
    expand: true,
    cwd: 'source/libraries/',
    src: '**',
    dest: 'public/assets/libraries/'
  },
  fonts: {
    expand: true,
    flatten: true,
    cwd: 'public',
    src: ['assets/libraries/font-awesome/fonts/*.*', 'bower_components/bootstrap/dist/fonts/*.*'],
    dest: 'public/fonts/'
  },
  root: {
    expand: true,
    cwd: 'source/',
    src: '*.html',
    dest: 'public/'
  }
}