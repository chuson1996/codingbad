var env='development';
for (var i = 0; i < process.argv.length; i++) {
	if (/^--ENV=/i.test(process.argv[i])) {
		env = process.argv[i].split(/^--ENV=/)[1];
		break;
	}
}
console.log(env);
var config;
if (env == 'development') {
	config = require('./webpack-config/development.js');
} else if (env == 'staging') {
	config = require('./webpack-config/staging.js');
} else if (env == 'production') {
	config = require('./webpack-config/production.js');
}

module.exports = config;