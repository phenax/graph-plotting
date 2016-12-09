
import {Graph} from './plot/Graph';

document.addEventListener('DOMContentLoaded', () => {

	const $canvas= document.createElement('canvas');
	$canvas.width= 500;
	$canvas.height= 500;

	document.body.appendChild($canvas);

	const context= $canvas.getContext('2d');

	const graph= new Graph({
		context,
		labels: {
			x: 'foo',
			y: 'bar'
		},
		dimens: {
			width: $canvas.width,
			height: $canvas.height,
		}
	});

	graph.setAxisX([-100, 100]);
	graph.setAxisY([-100, 100]);

	graph.plot(25, 25);
	graph.plot(50, 50);

	graph.plot(-25, 25);
	graph.plot(50, -50);

	graph.addLine({
		'standard': { m: 1, c: 50 },
		// '2 points': [ [-25, 25], [50, -50] ],
	});

	graph.show();
});
