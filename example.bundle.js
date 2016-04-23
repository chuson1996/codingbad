/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _watsonDeveloperCloud = __webpack_require__(1);

	var _watsonDeveloperCloud2 = _interopRequireDefault(_watsonDeveloperCloud);

	var _credentials = __webpack_require__(2);

	var _credentials2 = _interopRequireDefault(_credentials);

	var _async = __webpack_require__(3);

	var _async2 = _interopRequireDefault(_async);

	var _request = __webpack_require__(4);

	var _request2 = _interopRequireDefault(_request);

	var _lodash = __webpack_require__(5);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _fs = __webpack_require__(6);

	var _fs2 = _interopRequireDefault(_fs);

	var _q = __webpack_require__(7);

	var _q2 = _interopRequireDefault(_q);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	__webpack_require__(8);
	function callback(err, dialogs) {
		if (err) console.log('error:', err);else console.dir(dialogs);
	}

	var dialog_service = _watsonDeveloperCloud2.default.dialog({
		username: _credentials2.default.dialog.username,
		password: _credentials2.default.dialog.password,
		version: _credentials2.default.dialog.version
	});

	// dialog_service.createDialog({
	// 	name: 'pizza',
	// 	file: fs.createReadStream('pizza.xml')
	// }, callback);

	// dialog_service.getDialogs({}, callback);

	function makePromise(action, context) {
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			// console.log(context);
			return new Promise(function (resolve, reject) {
				action.apply(context, [].concat(args, [function (error, result) {
					// console.log('result: ');
					// console.dir(result);
					if (error) return reject(error);

					resolve(result);
				}]));
			});
		};
	}

	// console.log(makePromise(dialog_service.getDialogs, dialog_service)({}));

	_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
		var result, dialogs, dialog_id, res, client_id, conversation_id, res2;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return makePromise(dialog_service.getDialogs, dialog_service)({});

					case 2:
						result = _context.sent;

						console.log('result', result);
						dialogs = result.dialogs;
						/** If pizza template exists, skip this function. */

						if (!dialogs.some(function (item) {
							return item.name == 'pizza';
						})) {
							_context.next = 21;
							break;
						}

						/** If the pizza template exists... */
						/** 1. Get the dialog_id */
						console.log('Pizza found');
						dialog_id = _lodash2.default.find(dialogs, { name: 'pizza' }).dialog_id;


						console.log('Dialog_id: ', dialog_id);

						_context.next = 11;
						return makePromise(dialog_service.conversation, dialog_service)({
							dialog_id: dialog_id,
							input: 'What do you have?'
						});

					case 11:
						res = _context.sent;
						client_id = res.client_id;
						conversation_id = res.conversation_id;

						console.log(res.response);

						_context.next = 17;
						return makePromise(dialog_service.conversation, dialog_service)({
							dialog_id: dialog_id,
							client_id: client_id,
							conversation_id: conversation_id,
							input: 'Small?'
						});

					case 17:
						res2 = _context.sent;


						console.log(res2.response);
						_context.next = 24;
						break;

					case 21:
						console.log('Created pizza template');
						_context.next = 24;
						return makePromise(dialog_service.createDialog, dialog_service)({
							name: 'pizza',
							file: _fs2.default.createReadStream('pizza.xml')
						});

					case 24:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}))().catch(function (error) {
		console.log(error);
	});

	/** -------------------------- */

	// const document_conversion = watson.document_conversion({
	// 	username: credentials.retrieve_and_rank.username,
	// 	password: credentials.retrieve_and_rank.password,
	// 	version: credentials.retrieve_and_rank.version,
	// 	version_date: '2015-12-01'
	// });

	// document_conversion.convert({
	// 	file: fs.createReadStream('pizza.xml'),
	// 	conversion_target: document_conversion.conversion_target.ANSWER_UNITS
	// }, callback);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("watson-developer-cloud");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		"dialog": {
			"url": "https://gateway.watsonplatform.net/dialog/api",
			"password": "XnRpBFtWqZt8",
			"username": "0a40d887-a728-4cf6-9260-ec8646124650",
			"version": "v1"
		},
		"retrieve_and_rank": {
			"url": "https://gateway.watsonplatform.net/retrieve-and-rank/api",
			"password": "1LrEVsXcmtx6",
			"username": "8efc6363-3825-4997-a4ef-bde92027b032"
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("async");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("q");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }
/******/ ]);