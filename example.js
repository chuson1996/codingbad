'use strict';
import watson from 'watson-developer-cloud';
import credentials from './credentials.json';
import async from 'async';
import request from 'request';
import _ from 'lodash';
import fs from 'fs';
import q from 'q';

require('babel-polyfill');
function callback (err, dialogs) {
	if (err)
		console.log('error:', err);
	else
		console.dir(dialogs);
}

const dialog_service = watson.dialog({
	username: credentials.dialog.username,
	password: credentials.dialog.password,
	version: credentials.dialog.version
});

// dialog_service.createDialog({
// 	name: 'pizza',
// 	file: fs.createReadStream('pizza.xml')
// }, callback);

// dialog_service.getDialogs({}, callback);

function makePromise(action, context) {
	return function (...args) {
		// console.log(context);
		return new Promise((resolve, reject) => {
			action.apply(context, [...args, function (error, result) {
				// console.log('result: ');
				// console.dir(result);
				if (error) return reject(error);

				resolve(result);
			}]);
			
		});
	}
}

// console.log(makePromise(dialog_service.getDialogs, dialog_service)({}));

(async () => {
	const result = await makePromise(dialog_service.getDialogs, dialog_service)({});
	console.log('result', result);
	const {dialogs} = result;
	/** If pizza template exists, skip this function. */
	if (dialogs.some((item) => item.name == 'pizza')) {
		/** If the pizza template exists... */
		/** 1. Get the dialog_id */
		console.log('Pizza found');
		const dialog_id = _.find(dialogs, { name: 'pizza' })
			.dialog_id;

		console.log('Dialog_id: ', dialog_id);

		let res = await makePromise(dialog_service.conversation, dialog_service)({
			dialog_id,
			input: 'What do you have?'
		});

		const { client_id, conversation_id} = res;
		console.log(res.response);

		let res2 = await makePromise(dialog_service.conversation, dialog_service)({
			dialog_id,
			client_id,
			conversation_id,
			input: 'Small?'
		});

		console.log(res2.response);
	} else {
		console.log('Created pizza template');
		await makePromise(dialog_service.createDialog, dialog_service)({
			name: 'pizza',
			file: fs.createReadStream('pizza.xml')
		});
	}

})().catch((error) => {
	console.log(error);
});
