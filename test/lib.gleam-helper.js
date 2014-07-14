"use strict";


var chai = require('chai');
chai.use(require('sinon-chai'));

var nock = require('nock');
var expect = require('chai').expect;
var requireText = require('./support/require-text');

var gleamHelper = require('..');

describe('Gleam Helper', function () {

	it('should response to [dataMiddleware, responseRenderer] static methods', function () {
		expect(gleamHelper).itself.to.respondTo('dataMiddleware');
		expect(gleamHelper).itself.to.respondTo('responseRenderer');
	});

});
