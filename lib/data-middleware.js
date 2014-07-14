"use strict";

var _ = require('underscore');

function dataMiddleware(gleam, name) {

	return function (req, res, next) {
		var data;
		if (_.isString(req.param(name))) {
			try {
				data = gleam.fromJson(req.param(name));
				delete req.body[name];
				_.extend(req.body, data);
			} catch (exc) {

			}
			return next(null);
		}
		return next(null);
	};
}

module.exports = exports = dataMiddleware;
