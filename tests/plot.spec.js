/* eslint-disable */

const { expect }= require('chai');

require('babel-register')();

const { Graph }= require('../js_es2015/plot/Graph');
const { Line }= require('../js_es2015/plot/Line');


describe('Graph plotter', () => {

	let graph;

	beforeEach(() => {

		graph= new Graph({
			context: Graph.getMockContext(),
			labels: {
				x: 'awesome',
				y: 'ness'
			},
			dimens: {
				width: 500,
				height: 500,
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

		expect(graph._lines.length).to.eql(0);

		graph.plotLine({
			'2 points': [ [ 0, 0 ], [ 100, 100 ] ]
		});

		// Was it added
		expect(graph._lines.length).to.eql(1);

		// Is it a line
		expect(graph._lines[0]).to.be.an.instanceof(Line);

		// Check calculcations
		expect(graph._lines[0].slope).to.eql(1);
		expect(graph._lines[0].c).to.eql(0);

	});
});
