const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


const DIST_DIR = path.join(__dirname, '../dist')
const CLIENT_DIR = path.join(__dirname, '../src')

const config = {
	context: CLIENT_DIR,
	entry: ['../src/register/index.js']
	,
	output: {
		path: DIST_DIR,
		// filename: '[name].js',
		filename: '[name].[hash].js',
		publicPath: '/'
	},
	// devtool: 'inline-source-map',
	module: {
		rules: [{
				test: /\.html$/,
				exclude: /node_modules/,
				use: 'html-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.(jpg|png|gif)$/,
				exclude: /node_modules/,
				use: {
					loader: 'file-loader',
					options: {
						limit: 100000
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				exclude: /node_modules/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 100000
					}
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
		new ExtractTextPlugin({
			filename: 'bundle.css',
			allChunks: true,
			disable: true
		})
	]
}


module.exports = config