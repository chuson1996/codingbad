var webpack = require('webpack');
var baseConfig = require('./base.js');
var zlib = require('zlib');
var CompressionPlugin = require('compression-webpack-plugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');

var productionConfig = baseConfig;
productionConfig.plugins.push(
	// Plugin: UglifyJsPlugin
	// Description: Minimize all JavaScript output of chunks.
	// Loaders are switched into minimizing mode.
	//
	// See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
	new webpack.optimize.UglifyJsPlugin({ 
		sourceMap: true,
		beautify: false,
		comments: false,
		compress: {
			drop_console: true
		},
		mangle: true
	}),

	new DefinePlugin({
		'ENV': JSON.stringify('production')
	})

	// Plugin: CompressionPlugin
	// Description: Prepares compressed versions of assets to serve
	// them with Content-Encoding
	//
	// See: https://github.com/webpack/compression-webpack-plugin
	// new CompressionPlugin({
	// 	algorithm: function gzipMaxLevel(buffer, callback) {
	// 		return zlib['gzip'](buffer, {level: 9}, callback);
	// 	},
	// 	regExp: /\.css$|\.html$|\.js$|\.map$/,
	// 	threshold: 2 * 1024
	// })
);

module.exports = productionConfig;
