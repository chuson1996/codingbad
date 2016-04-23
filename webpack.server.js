var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.js');


config.entry.app.unshift(
	"webpack-dev-server/client?http://127.0.0.1:3000/", 
	"webpack/hot/dev-server"
);

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  hot: true,
  inline: true,
  contentBase: 'public',
  publicPath: config.output.publicPath || null
});
server.listen(3000);