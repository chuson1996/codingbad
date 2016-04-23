var baseConfig = require('./base.js');
var webpack = require('webpack');
var _ = require('lodash');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');

var stagingConfig = baseConfig;

stagingConfig.plugins.push(
	new DefinePlugin({
		'ENV': JSON.stringify('staging')
	})
);

module.exports = stagingConfig;
