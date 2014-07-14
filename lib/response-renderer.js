"use strict";

var _ = require('underscore');

/**
 * @param {String|Error} message
 * @returns {Object}
 */
function createMessage(message) {
	if (message instanceof Error) {
		return {
			'isError': true,
			'isMessage': false,
			'text': message.message,
			'trace': message.stack.trim()
		};
	} else {
		return {
			'isError': false,
			'isMessage': true,
			'text': message
		};
	}
}

function gleamEntityCreator(gleam, entityName) {
	return function (data) {
		return gleam.entity(entityName, data);
	};
}

/**
 * @param {Gleam} gleam
 * @return {Function}
 */
function responseRenderer(gleam) {

	/**
	 * @param {ExpressServerResponse} res
	 * @param {Error} error
	 * @param {Object} data
	 * @param {Boolean} isJsonp
	 */
	return function (res, error, data, isJsonp) {

		var responseGleam = gleam.entity('response'),
			payloadGleam = gleam.entity('response/payload'),
			messages = _.map(_.map(data.messages || [], createMessage), gleamEntityCreator(gleam, 'response/message')),
			redirect = data.redirect || null;

		delete data.messages;
		delete data.redirect;


		if (error && !messages.length) {
			if (!(error instanceof Error)) {
				error = new Error(error);
			}
			messages.unshift(gleam.entity('response/message', createMessage(error)));
		}

		payloadGleam.set({
			'data': data
		});

		responseGleam.set({
			'payload': [payloadGleam],
			'message': messages,
			'redirect': redirect
		});
		if (isJsonp) {
			return res.jsonp(responseGleam);
		} else {
			return res.json(responseGleam);
		}
	};
}


module.exports = exports = responseRenderer;


