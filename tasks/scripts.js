//引入一些包
import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';  //文件拼接
import webpack from 'webpack';      //打包
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';        //重命名
import livereload from 'gulp-livereload';       //自动刷新  热更新
import plumber from 'gulp-plumber'; //处理文件信息流
import rename from 'gulp-rename';       //重命名
import uglify from 'gulp-uglify';       //压缩js css
import {log,colors} from 'gulp-util';       //命令行输出
import args from './util/args';         //对命令行参数进行解析


//创建一个任务
gulp.task('scripts',()=>{
    //打开
    return gulp.src(['app/js/index.js'])
        //处理错误
        .pipe(plumber({
            errorHandle:function () {
                
            }
        }))
        .pipe(named())
        .pipe(gulpWebpack({
            module:{
                loaders:[{
                    test:/\.js$/,
                    loader:'babel-loader'
                }]
            }
        }),null,(err,stats)=>{
        log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
            chunks:false
    }))
    })
        //指定路径
    .pipe(gulp.dest('server/public/js'))
        //重命名
    .pipe(rename({
        basename:'cp',
        extname:'.min.js'
    }))
        //压缩
    .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))
    .pipe(gulp.dest('server/public/js'))
    .pipe(gulpif(args.watch,livereload()))

})