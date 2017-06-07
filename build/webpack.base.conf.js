const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const utils = require('./utils')

const config = require('./config')

const DIST_DIR = path.join(__dirname, '../dist')
const CLIENT_DIR = path.join(__dirname, '../src')


function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	context: CLIENT_DIR,
	entry: config.multiPage.entry,
	output: {
		path: DIST_DIR,
		// filename: '[name].js',
		filename: '[name].js',
		publicPath: '/'
	},
	// devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				include: [resolve('src')],
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
			'src': path.resolve(__dirname, '../src'),
            'vue': 'vue/dist/vue.js',
        }
	}
}