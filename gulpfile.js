var gulp = require("gulp"); //本地安装gulp所用到的地方
var gutil = require("gulp-util");
var del = require("del"); //删除文件
var less = require('gulp-less'); //less语法
var concat = require("gulp-concat"); //合并
var minifycss = require('gulp-minify-css'); //压缩css
var autoprefixer = require('gulp-autoprefixer'); //自动补全浏览器兼容后缀
var cached = require('gulp-cached'); // 搭配 gulp-remember 可增量编译
var remember = require('gulp-remember'); //搭配 gulp-cached 可增量编译
var plumber = require('gulp-plumber'); //校正报错
var replace = require('gulp-replace'); //替换
var webpack = require('webpack');
var config = require('./webpack.config.js');
var connect = require('gulp-connect'); //本地服务
var rest = require('connect-rest');
var uglify = require('gulp-uglify');

//开发路径
var src = {
    html: './src/index.html',
    other: './src/vendor/*.js',
    less: './src/style/styles.less',
    file: './src/style/img/**/*',  //静态文件样式
    vendor: './src/vendor/**/*.js'
}

//编译的路径
var dist = {
    root: "./dist/",
    js: './dist/js',
    less: './dist/style',
    file: './dist/style/img',
    vendor: './dist/js'
};

//清除dist文件
function clean(done) {
    del.sync(['dist/**/*']);
    done();
}

//webpack编译
function devWebpack(done) {
    webpack(config(), function (err, stats) {
        //  compileLogger(err, stats);

        done();
    });
}



//编译html
function html(done) {
    return gulp.src(src.html)
        .pipe(plumber())
        .pipe(cached('html')) // 只传递更改过的文件
        .pipe(replace(/\~\/(\S.*.(js|css|png|jpg|gif))/g, function (match, p1) {
            return '192.168.26.144:9090/' + p1;
        }))
        .pipe(remember('html')) // 把所有的文件放回 stream
        .pipe(gulp.dest(dist.root));
    done();
}

//开启本地服务
function connectServer(done) {
    connect.server({
        root: dist.root,
        port: 9092,
        livereload: {
            port: 32140
        },
        middleware: function (connect, opt) {
            return [rest.rester({
                context: "/"
            })]
        }
    });
    done();
}

//监听变化
function watch() {
    gulp.watch(src.html, gulp.series(html, reload));
    gulp.watch([
        './src/commpents/**/*.vue',
        './src/view/**/*.vue',
        './src/**/*.js',
        './src/*html',
        './src/commpents/editor/**/*',
        './src/common/**/*',
        './src/validator/**/*'
    ],
    gulp.series(devWebpack, reload));
    gulp.watch('./src/style/**/*.less', gulp.parallel(css));
    gulp.watch(src.file, gulp.parallel(file));
    gulp.watch(src.other, gulp.parallel(vendor));
  
}



 function css(done) {
    gulp.src(src.less) //该任务针对的文件
        .pipe(less())  //编less为css
        .pipe(autoprefixer())//补全浏览器前缀
        // .pipe(minify()) //该任务调用的模块压缩css  
        .pipe(gulp.dest(dist.less))
        .pipe(connect.reload());
    done();
};

function file(done) {
    gulp.src(src.file) //该任务针对的文件
        .pipe(gulp.dest(dist.file))
        .pipe(connect.reload());
    done();
};
function vendor(done) {
    gulp.src(src.other) //该任务针对的文件
        .pipe(uglify()) //压缩js
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
    done();
};

function reload() {
    return gulp.src('dist/')
        .pipe(connect.reload()); //自动刷新
        
}



gulp.task("default", gulp.series(clean, devWebpack, html, css, file,vendor, connectServer, watch));


