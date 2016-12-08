
import { Line } from './Line';


export class Graph {

	static getMockContext() {

		const fn= () => {};

		return {
			lineTo: fn, moveTo: fn, clearRect: fn,
		};
	}

	constructor(config) {

		this.DEFAULT_AXIS= [ 0, 200 ];

		this._points= [];
		this._axis= {};
		this._lines= [];

		this._ctx= config.context;

		this._labels= {
			x: config.labels.x || '',
			y: config.labels.y || '',
		};
	}

	get axis() {
		return Object.create(this._axis);
	}

	get labels() {
		return Object.create(this._labels);
	}

	setAxisX(limits) {
		this._axis.x= limits;
	}

	setAxisY(limits) {
		this._axis.y= limits;
	}

	plot(x, y, color) {
		this._points.push({ x, y, color });
	}

	_getLineEquation(m, c) {
		return x => m*x + c;
	}

	addLine(prop) {

		let equation;

		if(typeof prop['2 points'] === 'object')
			equation= Line.twoPointToStandard(prop['2 points']);

		else if(typeof prop['standard'] === 'object')
			equation= prop['standard'];

		if(equation)
			this._lines.push(new Line(equation));
	}

	rendeAxis() {

		// this._ctx.
	}

	render() {
		// Ctx rendering logic

		// this._ctx.clearReact(0, 0, )
	}
}
