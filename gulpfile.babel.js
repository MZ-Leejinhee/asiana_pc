import gulp from "gulp";
import del from "del";
import ws from "gulp-webserver";
import fileinclude from "gulp-file-include";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import miniCSS from "gulp-csso";
import ghPages from "gulp-gh-pages";
const sass = require("gulp-sass")(require("sass"));

const routes = {
  html: {
    watch: "src/**/*.html",
    src: "src/**/*.html",
    dest: "build",
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/renew2025.scss",
    dest: "build/C/pc/css",
  },
  css: {
    watch: "src/scss/css/*.css",
    src: "src/scss/css/*.css",
    dest: "build/C/pc/css/css",
  },
  font: {
    watch: "src/fonts/**/*.{ttf,woff,eof,svg}",
    src: "src/fonts/**/*.{ttf,woff,eof,svg}",
    dest: "build/C/pc/fonts",
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/**/*.js",
    dest: "build/C/pc/js",
  },
  jslib: {
    watch: "src/js/lib/*.js",
    src: "src/js/lib/*.js",
    dest: "build/C/pc/js/lib",
  },
};

const clean = () => del(["build/", ".publish"]);

const html = () =>
  gulp
  .src(routes.html.src)
  .pipe(fileinclude({
    prefix: '@@@',
    basepath: '@file'
  }))
  .pipe(gulp.dest(routes.html.dest));

const scss = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

const css = () =>
  gulp
    .src(routes.css.src)
    .pipe(gulp.dest(routes.css.dest));

const font = () =>
  gulp
    .src(routes.font.src)
    .pipe(gulp.dest(routes.font.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(gulp.dest(routes.js.dest));

const jslib = () =>
  gulp
    .src(routes.jslib.src)
    .pipe(gulp.dest(routes.jslib.dest));

const webserver = () =>
  gulp
    .src("build")
    .pipe(ws({
      livereload: true,
      open: true,
      port: 8081,
      })
    );

const gh = () => gulp.src("build/**/*").pipe(ghPages());

const watch = () => {
  gulp.watch(routes.html.watch, html);
  gulp.watch(routes.scss.watch, scss);
  gulp.watch(routes.css.watch, css);
  gulp.watch(routes.font.watch, font);
  gulp.watch(routes.js.watch, js);
  gulp.watch(routes.jslib.watch, jslib);
};

const prepare = gulp.series([font, css, js, jslib]);
const C = gulp.series([html, scss, css, js, jslib]);
const live = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, C]);
export const build = gulp.series([dev,live]);
export const deploy = gulp.series([dev, gh, clean]);