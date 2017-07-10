const path = require('path')
/*
    1. proxyTable是代理解决跨域请求问题
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
		assetsSubDirectory: 'static',
		proxyTable: {
			"/api": {
				target: 'http://192.168.10.68',
				changeOrigin: true
			}
		},
		cssSourceMap: false
	}
}