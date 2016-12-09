
import { Line } from './Line';


export class Graph {

	// Mock canvas context object for testing
	static getMockContext() {

		const fnNames= [
			'moveTo', 'lineTo', 'clearRect', 'arc',
		];

		const self= { calledFn: [] };
		const fn= name => () => self.calledFn.push(name);

		fnNames.forEach( name => self[name] = fn(name) );

		return self;
	}


	constructor(config) {

		this.AXIS_COLOR= 'rgba(81, 128, 233, .7)';
		this.GRID_COLOR= '#888';
		this.CENTER_COLOR= '#e95051';

		this._ctx= config.context;

		this.width= config.dimens.width;
		this.height= config.dimens.height;

		this.labels= {
			x: config.labels.x || '',
			y: config.labels.y || '',
		};

		this._init();
	}

	// Initialize state and state getters
	_init() {

		this._points= [];
		this.axis= {};
		this._lines= [];

		this.proportionX= x => this.point.shiftX( x / this.scale.x );
		this.proportionY= y => this.point.shiftY( y / this.scale.y );

		this.render= this.render.bind(this);
	}

	show() {
		requestAnimationFrame(this.render);
	}

	get point() {
		return {
			shiftX: x => (this.width/2 - (this.axis.x[0] + this.axis.x[1])/2 + x),
			shiftY: y => (this.height/2 + (this.axis.y[0] + this.axis.y[1])/2 - y),
		};
	}

	get scale() {
		return {
			x: (this.axis.x[1] - this.axis.x[0])/this.width,
			y: (this.axis.y[1] - this.axis.y[0])/this.height,
		};
	}

	setAxisX(limits) {
		if(limits[0] < limits[1])
			this.axis.x= limits;
		else throw new Error('The axis lower limit cannot be greater than the upper limit');
	}

	setAxisY(limits) {
		if(limits[0] < limits[1])
			this.axis.y= limits;
		else throw new Error('The axis lower limit cannot be greater than the upper limit');
	}

	plot(x, y, color='#555') {
		this._points.push({
			x: this.proportionX(x),
			y: this.proportionY(y),
			color
		});
	}

	addLine(prop) {

		let equation;

		if(typeof prop['2 points'] === 'object')
			equation= Line.toStandardForm(prop['2 points']);

		else if(typeof prop.standard === 'object')
			equation= [prop.standard.m, prop.standard.c];

		if(equation)
			this._lines.push(new Line(equation[0], equation[1]));
	}

	drawPoint(x, y, color='#555', size=4) {

		this._ctx.beginPath();
		this._ctx.arc(x, y, size, 0, Math.PI*2);

		this._ctx.save();
		this._ctx.fillStyle= color;
		this._ctx.fill();
		this._ctx.restore();
	}

	drawSegment(p1, p2, color='#555', size=1) {

		this._ctx.lineWidth= size;

		this._ctx.beginPath();
		this._ctx.moveTo(p1.x, p1.y);
		this._ctx.lineTo(p2.x, p2.y);

		this._ctx.save();
		this._ctx.strokeStyle= color;
		this._ctx.stroke();
		this._ctx.restore();
	}

	drawLine(line) {

		let points;

		if(Math.abs(line.slope) > 1) {

			points= [{
				x: this.axis.x[0],
				y: line.getY(this.axis.x[0]),
			}, {
				x: this.axis.x[1],
				y: line.getY(this.axis.x[1]),
			}];
		} else {

			points= [{
				x: line.getX(this.axis.y[0]),
				y: this.axis.y[0],
			}, {
				x: line.getX(this.axis.y[1]),
				y: this.axis.y[1],
			}];
		}

		points= points.map( p => ({
			x: this.proportionX(p.x),
			y: this.proportionY(p.y),
		}));

		this.drawSegment(points[0], points[1]);
	}

	renderAxis() {

		// Draw the y axis
		this.drawSegment(
			{ x: this.width, y: this.point.shiftY(0) },
			{ x: 0, y: this.point.shiftY(0) },
			this.AXIS_COLOR
		);

		// Draw the x axis
		this.drawSegment(
			{ x: this.point.shiftX(0), y: 0 },
			{ x: this.point.shiftX(0), y: this.height },
			this.AXIS_COLOR
		);

		// Origin
		this.drawPoint(this.point.shiftX(0), this.point.shiftY(0), this.CENTER_COLOR, 2);
	}

	renderGrid(size) {

		const divX= Math.floor((this.axis.x[1] - this.axis.x[0])/size);
		const divY= Math.floor((this.axis.y[1] - this.axis.y[0])/size);

		for(let i= 0; i< divX; i++) {

			const x= this.proportionX((i - Math.floor(divX/2))*size);

			this.drawSegment(
				{ x, y: 0 },
				{ x, y: this.height },
				this.GRID_COLOR, .3
			);
		}

		for(let i= 0; i< divY; i++) {

			const y= this.proportionY((i - Math.floor(divY/2))*size);

			this.drawSegment(
				{ x: this.width, y },
				{ x: 0, y },
				this.GRID_COLOR, .3
			);
		}
	}

	render() {

		this._ctx.clearRect(0, 0, this.width, this.height);

		this.renderGrid(10);

		// Draw all points
		this._points.forEach( p => this.drawPoint(p.x, p.y, p.color));

		// Draw all lines
		this._lines.forEach( l => this.drawLine(l));

		// Render the axis'
		this.renderAxis();

		// requestAnimationFrame(this.render);
	}
}
