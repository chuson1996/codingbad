var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');


module.exports = {
	entry: {
		babelPolyfill: ['babel-polyfill'],
		app: ['./src/app/index.js']
	},
	resolve: {
		root: './src',
		alias: {
			assets: path.join(__dirname, '../src/assets'),
			templates: path.join(__dirname, '../src/templates')
		}
	},
	output: {
		path: path.join(process.cwd(), 'frontend'),
		// Specifies the name of each output file on disk.
		// IMPORTANT: You must not specify an absolute path here!
		//
		// See: http://webpack.github.io/docs/configuration.html#output-filename
		filename: '[name].[hash].bundle.js',

		// The filename of the SourceMaps for the JavaScript files.
		// They are inside the output.path directory.
		//
		// See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
		sourceMapFilename: '[name].[chunkhash].bundle.map',

		// The filename of non-entry chunks as relative path
		// inside the output.path directory.
		//
		// See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
		chunkFilename: '[id].[chunkhash].chunk.js'
	},
	// Switch loaders to debug mode.
	//
	// See: http://webpack.github.io/docs/configuration.html#debug
	debug: false,

	// Developer tool to enhance debugging
	//
	// See: http://webpack.github.io/docs/configuration.html#devtool
	// See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
	devtool: 'source-map',
	plugins: [
		// Plugin: WebpackMd5Hash
		// Description: Plugin to replace a standard webpack chunkhash with md5.
		//
		// See: https://www.npmjs.com/package/webpack-md5-hash
		new WebpackMd5Hash(),

		// Plugin: CopyWebpackPlugin
		// Description: Copy files and directories in webpack.
		//
		// Copies project static assets.
		//
		// See: https://www.npmjs.com/package/copy-webpack-plugin
		new CopyWebpackPlugin([
			{ from: 'src/assets', to: 'assets' },
			{ from: 'src/fonts', to: 'fonts' },
			{ from: './bower_components', to: 'bower_components' }
		]),

		// Plugin: HtmlWebpackPlugin
		// Description: Simplifies creation of HTML files to serve your webpack bundles.
		// This is especially useful for webpack bundles that include a hash in the filename
		// which changes every compilation.
		//
		// See: https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({ template: 'src/index.jade', chunksSortMode: 'none' }),

		// Plugin: OccurenceOrderPlugin
		// Description: Varies the distribution of the ids to get the smallest id length
		// for often used ids.
		//
		// See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
		// See: https://github.com/webpack/docs/wiki/optimization#minimize
		new webpack.optimize.OccurenceOrderPlugin(true),
	],
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.js$/,
			include: path.join(process.cwd(), './src/app'),
			loaders: [
				'ng-annotate?add=true&singleQuotes=true&es6=true',
				'babel?cacheDirectory&presets[]=es2015&presets[]=stage-3&plugins[]=transform-runtime'
			],
		}, {
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
		}, {
			test: /\.woff2$|\.woff(\?.+){0,1}$|\.ttf(\?.+){0,1}$|\.eot(\?.+){0,1}$|\.svg(\?.+){0,1}$/,
			loader: 'file'
		}, {
			test: /\.(png|jpg|gif|mp4|pdf)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.jade$/,
			loader: 'jade-loader'
		}, ]
	}
}
