const { src, dest, series, parallel } = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass')); 
const uglify = require('gulp-uglify'); 
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const inline = require('gulp-inline')
const htmlmin = require('gulp-htmlmin')

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

function compileHtml() {
    return src('htmls/*.html')
        .pipe(inline({
            base:'./'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('./'));
}

exports.default =  series(parallel(compileCSS, compileJavascript), compileHtml);
