const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.conf')
const config = require('./config')

let htmlOutPut = multiEntry(config.multiPage.entry)
baseConfig.entry = setEntry(config.multiPage.entry)

module.exports = merge(baseConfig, {
	devtool: '#cheap-module-eval-source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader' ,'css-loader', 'postcss-loader','sass-loader']
			}
		]
	},
	plugins: [
        ...htmlOutPut,
		new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new FriendlyErrorsPlugin(),
	]
})

function multiEntry(entrys) {
    /*
        1. 开发环境下的chunks只需要引入自身的js
    */
    let arr = [];
    for (var key in entrys) {
        let newHtml = new HtmlWebpackPlugin({
            filename: `${key}.html`,
            template: `../src/${key}/index.html`,
            chunks: [key]
        })
        arr.push(newHtml);
    }
    return arr;
}

function setEntry(entrys) {
    let obj = {}
    for (var entry in entrys) {
        obj[entry] = [ 'webpack-hot-middleware/client?noInfo=true', entrys[entry]]
    }
    return obj;
}