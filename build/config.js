const path = require('path')
const publicPath = 'riskinfo'


module.exports = {
	build: {
		publicPath: publicPath,
		env: '"production"',
		assetsSubDirectory: 'static',
		outputPath: `../dist/${publicPath}/`
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
	pathSetting: {
		entry: [`../src/${publicPath}/index.js`]
	}
}