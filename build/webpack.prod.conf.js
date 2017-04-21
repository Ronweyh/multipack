const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const config = require('./webpack.base.conf')

config.devtool = 'cheap-module-source-map'

const pluginAdd = [
	new ExtractTextPlugin('[name].[contenthash].css'),
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
	// extract webpack runtime and module manifest to its own file in order to
	// prevent vendor hash from being updated whenever app bundle is updated
	new webpack.optimize.CommonsChunkPlugin({
		name: 'manifest',
		chunks: ['vendor']
	}),
	new webpack.DefinePlugin({
		"process.env": {
			"NODE_ENV": JSON.stringify('production')
		}
	})
]
config.plugins = config.plugins.concat(pluginAdd)

module.exports = config