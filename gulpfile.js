const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const minifyCSS = require("gulp-minify-css");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const babelify = require("babelify");
const uglify = require("gulp-uglify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const rename = require("gulp-rename");
const webserver = require("gulp-webserver");
const colors = require("colors");

// Source directory
const srcDir = "./src";
// Distribution directory
const distDir = "./dist";
// Port for the development server
const port = 4200;

/*
 Function to handle error while transforms in scss, js
*/
function handleError(error) {
  console.log(colors.red(error.toString()));
}

/*
 Gulp task to convert sass to vanills css
*/
gulp.task("sass", () => {
  gulp
    .src([`${srcDir}/sass/**/*.scss`, `${srcDir}/sass/**/*.css`])
    .pipe(sass())
    .on("error", handleError)
    .pipe(autoprefixer({ browsers: ["last 2 versions"] }))
    .pipe(concat("bundle.min.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest(distDir));
});

/*
 Gulp task to optimize images
*/
gulp.task("imagemin", () => {
  gulp
    .src([
      `${srcDir}/images/**/*.png`,
      `${srcDir}/images/**/*.jpg`,
      `${srcDir}/images/**/*.jpeg`
    ])
    .pipe(imagemin())
    .on("error", handleError)
    .pipe(gulp.dest(`${distDir}/images`));
});

/*
 Gulp task to convert ES2015 to vanilla js
*/
gulp.task("js", () => {
  browserify({ entries: `${srcDir}/js/app.js`, debug: true })
    .transform("babelify")
    .bundle()
    .on("error", handleError)
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename("jquery-simple-validator.min.js"))
    .pipe(gulp.dest(distDir));
});

/*
 Gulp task to minify all html files and copy them to dist directory
*/
gulp.task("html", () => {
  gulp
    .src(`${srcDir}/**/*.html`)
    .pipe(
      htmlmin({ collapseBooleanAttributes: true, collapseWhitespace: true })
    )
    .on("error", handleError)
    .pipe(gulp.dest(distDir));
});

/*
Gulp task to watch the changes in the src directory
*/
gulp.task("watch", () => {
  gulp.watch(`${srcDir}/sass/*.scss`, ["sass"]);
  gulp.watch(
    [
      `${srcDir}/images/**/*.png`,
      `${srcDir}/images/**/*.jpg`,
      `${srcDir}/images/**/*.jpeg`
    ],
    ["imagemin"]
  );
  gulp.watch(`${srcDir}/**/*.html`, ["html"]);
  gulp.watch(`${srcDir}/js/**/*.js`, ["js"]);
});

gulp.task("webserver", () => {
  gulp.src(`${distDir}`).pipe(
    webserver({
      port: port,
      livereload: true,
      open: true
    })
  );
});

/*
Gulp task to build the src directory to dist directory
*/
gulp.task("serve", ["sass", "imagemin", "js", "html", "watch", "webserver"]);

/*
Gulp default task
*/
gulp.task("default", ["serve"]);
