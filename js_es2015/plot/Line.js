
export class Line {

	static toStandardForm(points) {

		const
			x1= points[0][0],
			x2= points[1][0],
			y1= points[0][1],
			y2= points[1][1],
			m= (y2 - y1)/(x2 - x1);

		return [m, y1 - (x1 * m)];
	}

	constructor(m, c) {
		this.m= m;
		this.c= c;
	}

	getY(x) { return this.m*x + this.c; }
	getX(y) { return (y - this.c)/this.m; }
}
