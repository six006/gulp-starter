
/**
 * Dependency Imports
 */
import gulp   from 'gulp-tasks-scaffold';
import config from './gulp.config.json';

// Copy Folders / Files
gulp.Copy('copy', [
  { src: `${config.paths.vendor.fontawesome.fonts}/**/*`, dest: `${config.paths.dist.fonts}` }
]);

// HTML Replace CSS & JS Links
gulp.Html('html', `${config.paths.src.html}/*`, config.paths.dist.html, '../css/app.css', '../js/app.js');

// Compile Sass
gulp.Sass('sass', `${config.paths.src.sass}/**/*.scss`, config.paths.dist.css, 'app.css');

// Complile JS
// gulp.Browserify('browserify', `${config.paths.src.js}/scripts.js`, `${config.paths.dist.js}/`, 'app.js', ['babelify'], []);

// Compile TS
gulp.Browserify('browserify', `${config.paths.src.js}/example.ts`, config.paths.dist.js, 'app.js', ['babelify'], ['tsify']);

// Lint ES6
// gulp.Eslint('eslint', `${config.paths.src.js}/**/*.js`, `${config.paths.src.js}/vendor/**`, '.eslintrc');

// Lint TypeScript
gulp.Tslint('tslint', `${config.paths.src.js}/**/*.ts`, `${config.paths.src.js}/vendor/**/*`, 'tslint.json');

// Lint Scss
gulp.Scsslint('scsslint', `${config.paths.src.sass}/**/*.scss`, `${config.paths.src.sass}/vendor/**/*.scss`, '.scss-lint.yml');

// Clean Dist Folder
gulp.Clean('clean', [`${config.paths.dist.css}/**/*`, `${config.paths.dist.js}/**/*`, `${config.paths.dist.fonts}/**/*`, `${config.paths.dist.html}/**/*`]);

// Default Task
gulp.Default(['copy', 'scsslint', 'sass', 'tslint', 'browserify', 'html']);

// Watch Task
gulp.Watch([], [
  { path: `${config.paths.src.js}/**/*.{ts,js,vue}`, tasks: ['tslint', 'browserify'] },
  { path: `${config.paths.src.sass}/**/*.scss`, tasks: ['scsslint', 'sass'] },
  { path: `${config.paths.src.html}/**/*.html`, tasks: ['html'] }
]);
