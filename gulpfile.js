var gulp = require("gulp");
const mergeStream = require("merge-stream");
(pug = require("gulp-pug")),
  (concat = require("gulp-concat")),
  (browserSync = require("browser-sync").create()),
  (gp = require("gulp-load-plugins")());
gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: "./view"
    }
  });
});
gulp.task("scripts", function() {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/slick-carousel/slick/slick.min.js",
      "./src/js/jquery.fancybox.min.js",
      // "./src/js/gmaps.min.js",
      // "./src/js/jquery-ui.min.js",
      // "./src/js/map.js",
      "./src/js/main.js"
    ])
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./view/js/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("scss", function() {
  var sassStream, cssStream;
  cssStream = gulp.src(["./src/scss/comp/fancy.css"]);

  sassStream = gulp
    .src("./src/scss/main.scss")
    .pipe(gp.sourcemaps.init())
    .pipe(
      gp.sass({
        includePaths: [
          "node_modules/node-normalize-scss",
          "node_modules/bootstrap-4-grid/scss/grid"
        ]
      })
    )
    .pipe(
      gp.autoprefixer({
        browsers: ["last 10 versions"],
        cascade: false
      })
    )
    .pipe(gp.csso());

  return mergeStream(sassStream, cssStream)
    .pipe(concat("main.css"))
    .pipe(gp.sourcemaps.write("./map/"))
    .pipe(gulp.dest("./view/css/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("pug", function() {
  return gulp
    .src("./src/pug/pages/*.pug")
    .pipe(
      gp.pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("./view/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("watch", function() {
  gulp.watch(["./src/pug/**/*.pug"], gulp.series("pug"));
  gulp.watch(["./src/scss/**/*.scss"], gulp.series("scss"));
  gulp.watch(["./src/js/**/*.js"], gulp.series("scripts"));
});

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("pug", "scss", "scripts"),
    gulp.parallel("watch", "server")
  )
);
