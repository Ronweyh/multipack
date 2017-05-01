const path = require('path')
const config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
	var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
		config.build.assetsSubDirectory :
		config.dev.assetsSubDirectory
	return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
	options = options || {}

	// 默认就有一个css-loader
	// minimize后面需要跟production区分是否需要，还有sourcemap
	var cssLoader = {
		loader: 'css-loader',
		options: {
			minimize: false,
			// minimize: process.env.NODE_ENV === 'production',
			sourceMap: false
		}
	}
	// 此函数传进来一个需要解析的css语言-参数loader
	function generateLoaders(loader, loaderOptions) {
		var loaders = [cssLoader]
		if (loader) {
			loaders.push({
				loader: loader + '-loader',
				options: Object.assign({}, loaderOptions, {
					sourceMap: false
				})
			})
		}

		// Extract CSS when that option is specified
		// (which is the case during production build)
		if (options.extract) {
			return ExtractTextPlugin.extract({
				use: loaders,
				fallback: 'style-loader'
			})
		} else {
			return ['style-loader'].concat(loaders)
		}
	}

	// http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
	return {
		css: generateLoaders(),
		postcss: generateLoaders(),
		less: generateLoaders('less'),
		sass: generateLoaders('sass', {
			indentedSyntax: true
		}),
		scss: generateLoaders('sass'),
		stylus: generateLoaders('stylus'),
		styl: generateLoaders('stylus')
	}
}

exports.styleLoaders = function (options) {
	var output = []
	var loaders = exports.cssLoaders(options)
	for (var extension in loaders) {
		var loader = loaders[extension]
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			use: loader
		})
	}
	return output
}