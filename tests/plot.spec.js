/* eslint-disable */

const { expect }= require('chai');

require('babel-register')();

const { Graph }= require('../js_es2015/plot/Graph');


describe('Graph plotter', () => {

	let graph;

	beforeEach(() => {

		graph= new Graph({
			context: Graph.getMockContext(),
			labels: {
				x: 'awesome',
				y: 'ness'
			}
		});

		graph.setAxisX([0,100]);
		graph.setAxisY([0,200]);
	});

	it('should be configured', () => {

		expect(graph.axis.x[1]).to.eql(100);
		expect(graph.axis.y[1]).to.eql(200);
	});

	it('should plot points', () => {

		expect(graph._points.length).to.eql(0);

		graph.plot(10, 20);
		graph.plot(80, 50);

		expect(graph._points.length).to.eql(2);
	});

	it('should draw lines', () => {

		graph.addLine({
			'2 point': [ [ 0, 0 ], [ 100, 100 ] ]
		});
	});
});
