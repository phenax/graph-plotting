/* eslint-disable */

const { expect }= require('chai');

require('babel-register')();

const Graph= require('../js_es2015/plot/Graph');


describe('Graph plotter', () => {

	it('should be configured', () => {

		expect(1).to.eql(1);
	});
});
