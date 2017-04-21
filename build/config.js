const path = require('path')
const publicPath = 'register'


module.exports = {
	build: {
		publicPath: publicPath,
		env: '"production"',
		assetsSubDirectory: 'static',
		outputPath: '../dist/register/'
	},
	dev: {
		env: '"development"',
		port: 5000,
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
	pathSetting: {
		entry: ['../src/register/index.js']
	}
}