import yargs from 'yargs';

const args = yargs
    //区分线上还是开发环境
    .option('production',{
    boolean:true,
    default:false,  //默认是开发环境
    describe:'min all scripts'
})
    //是否监听文件
.option('watch',{
    boolean:true,
    default:false,
    describe:'watch all files'
})
    //是否详细输出命令行执行的日志
.option('verbose',{
    boolean:true,
    default:false,
    describe:'log'
})
.option('sourcemaps',{
    description:'force the creation of sroucemaps'
})
    //服务器端口
.option('port',{
    string:true,
    defalut:8080,
    describe:'server port'
})
    //以字符串进行解析
.argv;
export default args;
