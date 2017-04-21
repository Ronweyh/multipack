const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseConfig = require('./webpack.base.conf')

baseConfig.entry.unshift('webpack-hot-middleware/client')
baseConfig.entry.unshift('../build/dev-hot-html')

// baseConfig.output.publicPath = '/'
baseConfig.devtool = '#cheap-module-eval-source-map'

const pluginsAdd = [
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new FriendlyErrorsPlugin()
]
baseConfig.plugins = baseConfig.plugins.concat(pluginsAdd)

module.exports = baseConfig