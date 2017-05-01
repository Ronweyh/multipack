const path = require('path')
/*
    1. proxyTable是代理解决跨域请求问题
    2. 入口只需哟在multiPage中写入你的入口
        @注：key必须与src下的目录名相同 ==> 如： register和src下的register目录名字相同
*/

module.exports = {
	build: {
		publicPath: '/',
		env: '"production"',
		assetsSubDirectory: 'static',
        buildDirectory: path.join(__dirname, '../dist'),
        // 设置为true，会把所有引入过的模块打包到一个文件，设置为false，那么只有当所有入口文件都引入过的chunk才会被打包
        bundleAllChunks: false
	},
	dev: {
		env: '"development"',
		port: 3000,
		// autoOpenBrowser: false,
		assetsSubDirectory: 'static',
		// assetsPublicPath: '/',
		proxyTable: {
			"/rdi": {
				target: 'http://192.168.10.68:8082/x9Rdi',
				changeOrigin: true
			}
		},
		cssSourceMap: false
	},
    multiPage: {
        entry: {
            register: '../src/register/index.js',
            riskinfo: '../src/riskinfo/index.js'
        }
    }
}