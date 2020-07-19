const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    // 模式
    mode: 'development', // development | production
    // 入口配置
    entry: './src/index.js',
    // 输出配置
    output: {
        // 输出路径
        // path: resolve(__dirname, 'dist'),
        path: resolve(__dirname, 'dist'),
        // 输出文件名
        filename: 'build.js'
    },
    // loader配置
    module: {
        // 处理规则
        rules: [
            {
                // 利用eslint进行js语法检查
                test: /\.js$/,
                loader: 'eslint-loader', // 检查代码是否满足eslint规范
                exclude: /node_modules/, // 排除对第三方库检查
                enforce: 'pre', // 优先执行eslint检查
                options: {
                  fix: true // 出现不满足规则将会自动修复
                }
            },
            {
                // 利用babel进行js兼容性处理
                test: /\.js$/,
                loader: 'babel-loader', // 将es6+格式的代码转化为es5格式
                exclude: /node_modules/ // 排除对第三方库检查
            },
            {
                // 处理css资源
                test: /\.css$/,
                // 执行顺序：从后向前依次执行（也可说从右往左，从下往上）
                use: [
                  // 'style-loader', // 创建style标签，将js中的样式资源插入到style标签并添加到head标签
                  MiniCssExtractPlugin.loader, // 取代style-loader, 可提取bundle.js中的css为单独文件并以link标签添加到head标签
                  'css-loader' // 将css资源编译成commonjs模块加载到js中，但仍然保持样式字符串的形式
                ]
            },
            {
                // 处理less资源
                test: /\.less$/,
                // 执行顺序：从后向前依次执行（也可说从右往左，从下往上）
                use: [
                    // 'style-loader', // 创建style标签，将js中的样式资源插入到style标签并添加到head标签
                    MiniCssExtractPlugin.loader, // 取代style-loader, 可提取bundle.js中的css为单独文件并以link标签添加到head标签
                    'css-loader', // 将css资源编译成commonjs模块加载到js中，但仍然保持样式字符串的形式
                    'less-loader' // 将less资源编译成css资源
                ]
            },
            {
                // 处理图片资源
                test: /\.(jpe?g|png|gif)$/,
                // 注意：一个loader可直接使用loader选项，多个选项需要使用use: [loader1,loader2]
                loader: 'url-loader', // 处理样式文件中url引入图片的方式(通过background-image)
                options: {
                  limit: 8 * 1024, // 当图片小于8kb时会当做base64处理(减少请求数，以减轻服务器压力，但图片体积会增大而影响文件速度)
                  esModule: false,  // 默认url-loader采用的是es6的模块化解析方式，而html-loader@0.5.5采用的commonjs规范引入图片，解析后会出现[Object Module]的问题
                  // 解决办法(两种)：1）升级html-loader为1.0.0；2）关闭url-loader的es6模块解析方式
                  name: '[hash:8].[ext]' // 修改图片资源的名称(取图片hash前8位)和对应的后缀名
                }
            },
            {
                // 处理html中引入图片资源
                test: /\.html?$/,
                loader: 'html-loader' // 处理html中img引入图片的方式(处理完成后交给url-loader)
            }
        ]
    },
    // 插件配置
    plugins: [
        // new HtmlWebpackPlugin() // 在输出目录默认创建一个index.html文件，引入打包的所有资源(js/css)
        new HtmlWebpackPlugin({
            template: './src/index.html', // 复制指定template对应的index.html并自动引入所有打包后的资源(js/css)
            // html压缩(html-webpack-plugin@4.0.0后在生产环境下不需要再配置)
            minify: {
                collapseWhitespace: true, // 移除空格
                removeComments: true // 移除注释
            }
        }),
        new MiniCssExtractPlugin({
            filename: './css/main.css' // 对输出文件添加独立的目录和重命名(默认为main.css)
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 开发服务器配置(自动化：自动编译，自动打开浏览器，自动刷新浏览器)
    // 只会在内存中打包，不会在本地输出，启动指令：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'dist'), // devServer启动应用目录(一般为打包后的输出目录)
        compress: true, // 开启gzip压缩
        open: true, // 编译完成后自动打开(默认)浏览器
        port: 8000 // 启动端口号
    }
}