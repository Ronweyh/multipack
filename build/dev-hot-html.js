// 为单页应用使用，html不会热加载

require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true')

hotClient.subscribe(function (event) {
	if (event.action === 'reload') {
		window.location.reload()
	}
})