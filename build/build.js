const webpack = require('webpack')
const path = require('path')
const rm = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')

const devConfig = require('./webpack.prod.conf')
const config = require('./config')

const spinner = ora({
    color: 'green',
    text: '正在打包，请耐心等待...'
})

spinner.start()

rm(config.build.buildDirectory, err => {
    if (err) throw err
    webpack(devConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  提示: 打包后的代码需要一个http服务器来运行.\n' +
            '  本地文件方式打开将会报错.\n' + 
            '  推荐安装serve插件.\n'
        ))
    })
})