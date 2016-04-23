'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	// Project configuration.
	var gruntConfig = {
		"bower-install-simple": {
			target: {
				options: {
					cwd: './'
				}
			}
		},
		'http-server': {
			dev: {
				root: 'frontend',
				port: 3000,
				host: '0.0.0.0',
				showDir: true,
				autoIndex: true,
				ext: 'html',
				runInBackground: true,
				openBrowser: false
			},
			single: {
				root: 'frontend',
				port: 3000,
				host: '0.0.0.0',
				showDir: true,
				autoIndex: true,
				ext: 'html',
				openBrowser: false
			}
		},
		open: {
			dev: {
				path: 'http://127.0.0.1:3000/#/select-product/TTVAROM',
				app: 'Google Chrome'
			},
			staging: {
				path: 'http://www.taaleritest.local/#/select-product/TTVAROM',
				app: 'Google Chrome'
			}
		},
		tunnelExec: {
			staging: {
				options: {
					user: 'taaleritehdas',
					targetHost: '10.113.112.213',
					targetPort: '443',
					localPort: '9000',
					remoteHost: '172.21.254.5',
					identityFile: './keys/id_rsa'
				},
				exec: function(err, tunnel) {
					// Do something here
				}
			}
		},
		watch: {
			bower: {
				files: 'bower.json',
				tasks: ['bower-install-simple']
			}
		},
		webfont: {
			icons: {
				src: 'src/assets/images/taaleri/*.svg',
				dest: 'src/fonts/icons',
				options: {
					syntax: 'bem',
					templateOptions: {
						baseClase: 'taaleri-icon',
						classPrefix: 'taaleri-icon-',
						mixinPrefix: 'taaleri-icon-',
					},
					codepoints: require('./taaleri-icon-codepoints.js')
				}
			}
		}
	};

	grunt.initConfig(gruntConfig);

	grunt.registerTask('serve', ['http-server:dev', 'open:dev', 'watch']);
	grunt.registerTask('default', ['serve']);
};
