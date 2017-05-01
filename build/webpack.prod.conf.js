const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config')
const baseConfig = require('./webpack.base.conf')

baseConfig.entry = config.multiPage.entry
baseConfig.output = {
	path: path.resolve(__dirname,'../dist'),
	// 把js、css放在static目录下
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[id].chunk.js',
	// 公共路径前面放上不同页面的地址
	publicPath: `/`
}
let htmlOutPut = multiEntry(baseConfig.entry)
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
        ...htmlOutPut,
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			//源码false
			sourceMap: false
		}),
		new ExtractTextPlugin('static/css/[name].[contenthash].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
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

function multiEntry(entrys) {
    /*
        1. 每一个文件要引入的js有三个，两个公共chunk，一个自身js
        2. 输出的时候也是根据各自的名字，输出对应的文件夹
        3. template模板取自对应key目录文件下html
    */
    let arr = [];
    for (var key in entrys) {
        let newHtml = new HtmlWebpackPlugin({
            filename: `${key}/index.html`,
            template: `../src/${key}/index.html`,
            chunks: ['vendor', 'manifest', key],
            inject: true,
            hash: true
        })
        arr.push(newHtml);
    }
    return arr;
}