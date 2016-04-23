var baseConfig = require('./base.js');
var webpack = require('webpack');
var _ = require('lodash');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');

var devConfig = baseConfig;
devConfig.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
	new DefinePlugin({
		'ENV': JSON.stringify('development')
	})
);

module.exports = devConfig;
