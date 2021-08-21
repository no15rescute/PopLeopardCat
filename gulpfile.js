const { src, dest, series, parallel } = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass')); 
const uglify = require('gulp-uglify'); 
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


function compileJavascript() {
    return src(['scripts/*.js','!scripts/*.min.js'])
        .pipe(babel())
        .pipe(uglify()) // uglify 只改 local 變數，而不改全域變數
        .pipe(rename({extname:'.min.js'}))
        .pipe(dest('scripts'))
}

function compileCSS() {
    var plugins = [
        autoprefixer(),
    ];
    return src('css/*.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(postcss(plugins))
        .pipe(dest('css'));
}

exports.default = parallel(compileCSS, compileJavascript);
