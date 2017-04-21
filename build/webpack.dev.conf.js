const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseConfig = require('./webpack.base.conf')
const config = require('./config')

module.exports = merge(baseConfig, {
	devtool: '#cheap-module-eval-source-map',
	entry: ['webpack-hot-middleware/client'],
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
		new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new FriendlyErrorsPlugin()
	]
})