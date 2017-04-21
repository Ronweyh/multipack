const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const pathConfig = require('./config').pathSetting
const utils = require('./utils')


const DIST_DIR = path.join(__dirname, '../dist')
const CLIENT_DIR = path.join(__dirname, '../src')


function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

const config = {
	context: CLIENT_DIR,
	entry: pathConfig.entry,
	output: {
		path: DIST_DIR,
		// filename: '[name].js',
		filename: '[name].[hash].js',
		publicPath: '/'
	},
	// devtool: 'inline-source-map',
	module: {
		rules: [ {
				test: /\.html$/,
				exclude: /node_modules/,
				use: 'html-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: [resolve('src')],
				use: 'babel-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	resolve: {
		extensions: [' ', '.js', '.jsx', 'json'],
		alias: {
			src: path.resolve(__dirname, '../src')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: '../src/register/register.html'
		}),
		// new ExtractTextPlugin({
		// 	filename: 'bundle.css',
		// 	allChunks: true,
		// 	disable: true
		// })
	]
}


module.exports = config