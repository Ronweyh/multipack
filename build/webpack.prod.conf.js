const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config')
const baseConfig = require('./webpack.base.conf')

baseConfig.entry = config.pathSetting.entry
baseConfig.output = {
	path: path.resolve(__dirname,config.build.outputPath),
	// 把js、css放在static目录下
	filename: path.posix.join('static','[name].[chunkhash].js'),
	// publicPath: `/${config.build.basicPath}/static/`
	// 公共路径前面放上不同页面的地址
	publicPath: `/${config.build.publicPath}`
}

module.exports = merge(baseConfig, {
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": config.build.env
			}
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: `../src/${config.build.publicPath}/index.html`
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			//源码false
			sourceMap: false
		}),
		new ExtractTextPlugin(path.posix.join('static','[name].[contenthash].css')),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		})
	]
})