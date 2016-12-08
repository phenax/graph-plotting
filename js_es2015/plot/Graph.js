
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
		this.OFFSET= 30;

		this._points= [];
		this._axis= {};
		this._lines= [];

		this._scale= 1;

		this._ctx= config.context;

		this.width= config.dimens.width;
		this.height= config.dimens.height;

		this._labels= {
			x: config.labels.x || '',
			y: config.labels.y || '',
		};
	}


	start() {

		this.render();
	}

	get point() {
		return this.relativeToOrigin(
			this.width/2 - (this.axis.x[0] + this.axis.x[1])/2, 
			this.height/2 + (this.axis.y[0] + this.axis.y[1])/2
		);
	}

	get axis() {
		return Object.create(this._axis);
	}

	get labels() {
		return Object.create(this._labels);
	}

	setScale(scale) {
		this._scale= scale;
	}

	setAxisX(limits) {
		if(limits[0] < limits[1])
			this._axis.x= limits;
	}

	setAxisY(limits) {
		if(limits[0] < limits[1])
			this._axis.y= limits;
	}

	proportionX(x) {

		x /= (this.axis.x[1] - this.axis.x[0])/this.width;
		x= this.point.getX(x);


		return x;
	}

	proportionY(y) {

		y /= (this.axis.y[1] - this.axis.y[0])/this.height;
		y= this.point.getY(y);

	
		return y;	
	}

	plot(x, y, color='#555') {

		this._points.push({
			x: this.proportionX(x),
			y: this.proportionY(y),
			color
		});
	}

	_getLineEquation(m, c) {
		return x => m*x + c;
	}

	addLine(prop) {

		let equation;

		if(typeof prop['2 points'] === 'object')
			equation= Line.toStandardForm(prop['2 points']);

		else if(typeof prop['standard'] === 'object')
			equation= [prop['standard'].m, prop['standard'].c];

		if(equation)
			this._lines.push(new Line(equation));
	}

	drawPoint(x, y, color='#555', size=4) {

		console.log(x, y, color);
		this._ctx.beginPath();
		this._ctx.arc(x, y, size, 0, Math.PI*2);

		this._ctx.save();
		this._ctx.fillStyle= color;
		this._ctx.fill();
		this._ctx.restore();
	}

	relativeToOrigin(originX, originY) {

		return {
			getX(x) { return originX + x; },
			getY(y) { return originY - y; }
		};
	}

	drawLine(p1, p2, color='#555') {

		this._ctx.beginPath();
		this._ctx.moveTo(p1.x, p1.y);
		this._ctx.lineTo(p2.x, p2.y);

		this._ctx.save();
		this._ctx.strokeStyle= color;
		this._ctx.stroke();
		this._ctx.restore();
	}

	rendeAxis() {

		this.drawLine(
			{ x: this.width, y: this.point.getY(0) },
			{ x: 0, y: this.point.getY(0) },
			'rgba(81, 128, 233, .7)'
		);

		this.drawLine(
			{ x: this.point.getX(0), y: 0 },
			{ x: this.point.getX(0), y: this.height },
			'rgba(81, 128, 233, .7)'
		);

		this.drawPoint(this.point.getX(0), this.point.getY(0), 'red', 2);
	}

	render() {

		this._ctx.clearRect(0, 0, this.width, this.height);

		this.rendeAxis();

		this._points.forEach( p => {
			this.drawPoint(p.x, p.y, p.color);
		});

	}
}
