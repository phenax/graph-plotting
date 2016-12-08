
export class Line {

	static twoPointToStandard(points) {

		const
			x1= points[0][0],
			x2= points[1][0],
			y1= points[0][1],
			y2= points[1][1],
			m= (y2 - y1)/(x2 - x1);

		return x => m*x + (y1 - (x1 * m));
	}

	constructor(eqn) {
		this.equation= eqn;
	}

	getY(x) {
		return this.equation(x);
	}
}
