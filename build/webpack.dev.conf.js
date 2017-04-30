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
	// entry: {
    //     HMR: 'webpack-hot-middleware/client'
    // },
    // entry: [ 'webpack-hot-middleware/client' ],
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
        1. 每一个文件要引入的js有三个，两个公共chunk，一个自身js
        2. 输出的时候也是根据各自的名字，输出对应的文件夹
        3. template模板取自对应key目录文件下html
    */
    let arr = [];
    for (var key in entrys) {
        let newHtml = new HtmlWebpackPlugin({
            filename: `${key}.html`,
            template: `../src/${key}/index.html`
        })
        arr.push(newHtml);
    }
    return arr;
}

function setEntry(entrys) {
    let obj = {}
    for (var entry in entrys) {
        obj[entry] = [ 'webpack-hot-middleware/client', entrys[entry]]
    }
    return obj;
}