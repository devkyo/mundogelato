const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const inject = require('gulp-inject');


// paths dirs 
const paths = {
    styles: {
      src: 'src/assets/scss/*.scss',
      dest: 'dist/assets/css/'
    },
    scripts: {
      src: 'src/assets/js/**/*.js',
      dest: 'dist/assets/js/'
    },
    images: {
       src: './src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)',
       dest: './dist/assets/images'
    },
    html: {
       src: './src/**/**.html',
       dest: './dist/'
    } 
};

const styles = ()=>{
   return gulp.src([
      paths.styles.src,
      'node_modules/bulma/bulma.sass'
   ])
      .pipe(sourcemaps.init())
      .pipe(sass({errLogToConsole: true}))
      .pipe(
         autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false,
         }),
      )
      .pipe(
         cleanCSS({ debug: true }, function(details) {
         console.log('=========================================');
         console.log(details.name + ': ' + details.stats.originalSize);
         console.log(details.name + ': ' + details.stats.minifiedSize);
         console.log('=========================================');
         }),
      )
      .pipe(rename({ suffix: '.min' }))
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(gulp.dest('./src/assets/css'))
      .pipe(browserSync.stream())
 }

 const optimiseImages = ()=>{
   return (
     gulp
       .src(paths.images.src)
       .pipe(
         imagemin({
           interlaced: true,
         }),
       )
       .pipe(gulp.dest(paths.images.dest))
   );
 }

const scripts = ()=>{
    return gulp.src([
      //  if you use bootstrap or other plugin
		// 'node_modules/bootstrap/dist/js/bootstrap.min.js',
		// 'node_modules/jquery/dist/jquery.min.js',
      // 'node_modules/popper.js/dist/umd/popper.min.js',
      paths.scripts.src
   ])
   .pipe(minify({
      ext: {
         src: '.js',
         min: '.min.js'
      },
      ignoreFiles: [
         '*.combo.js',
         '*.min.js'
      ]
   }))
   .pipe(gulp.dest(
      paths.scripts.dest,
      // './src/assets/js/'
      ))
	.pipe(browserSync.stream());
}

const watch = ()=>{
    browserSync.init({
      server: './dist/',
      //use proxy when working in php files
      // proxy: "project.test/src"
      port: 80
	});
      gulp.watch(paths.scripts.src, scripts);
      gulp.watch(paths.styles.src, styles);
      gulp.watch(paths.html.src, html);
      gulp.watch(paths.scripts.src).on('change', browserSync.reload);
      gulp.watch(paths.html.src).on('change', browserSync.reload);
      gulp.watch(paths.html.dest).on('change', browserSync.reload);
   
}


const html = ()=>{

   return gulp.src([
      paths.html.src,
      //use .php extension  when working in php files
      // './src/*.php'
   ])
   .pipe(inject(gulp.src([
      './src/assets/js/**.js',
      './src/assets/css/**.css'
   ], {read: false}), {
      ignorePath: ['src'],
      addRootSlash: false
   }))
   .pipe(gulp.dest(paths.html.dest))
   .pipe(browserSync.stream());

}

exports.default = gulp.parallel(scripts,styles,watch,optimiseImages,html);

