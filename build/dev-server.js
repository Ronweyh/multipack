const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')

const webpackConfig = require('./webpack.dev.conf')
const config = require('./config')
const proxyTable = config.dev.proxyTable
// 先定义后面需要用的变量
const app = express(),
	  DIST_DIR = path.join(__dirname, '../dist'),
	  PORT = config.dev.port,
	  compiler = webpack(webpackConfig)
// dev-middleware和hotmiddleware返回webpack实例
const devMiddleware = webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true,
	noInfo: true,
	stats: {
		colors: true
	}
})
const hotMiddleware = webpackHotMiddleware(compiler, {
	log: () => {}
})
// 代理请求设置
Object.keys(proxyTable).forEach((context) => {
	let options = proxyTable[context]
	if (typeof options === 'string') {
		options = {
			target: options
		}
	}
	app.use(proxyMiddleware(options.filter || context, options))
})
// 当修改html时，让服务器重载
// compiler.plugin('compilation', (compilation) => {
//     compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
//         hotMiddleware.publish({
//             action: 'reload'
//         })
//         cb()
//     })
// })

app.use(devMiddleware)

app.use(hotMiddleware)

app.get('/:name', (req, res, next) => {
    let name = req.params.name ? req.params.name + '.html' : 'index.html';
	const filename = path.join(compiler.outputPath, name)

	compiler.outputFileSystem.readFile(filename, (err, result) => {
		if (err) {
			return next(err)
		}
		res.set('content-type', 'text/html')
		res.send(result)
		res.end()
	})
})

app.listen(PORT, () => {
	console.log(`Your server is running at localhost:${PORT}`)
})