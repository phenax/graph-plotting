
import {Graph} from './plot/Graph';

document.addEventListener('DOMContentLoaded', () => {

	const $canvas= document.createElement('canvas');
	$canvas.width= 500;
	$canvas.height= 600;

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


	const getRandomNumber= (min, max) => (Math.floor(Math.random()*(max - min + 1) + min));

	graph
		.setAxisX([-100, 100])
		.setAxisY([-100, 100]);

	for(let i= 0; i< 20; i++) {
		graph.plot(getRandomNumber(-100, 100), getRandomNumber(-100, 100));
	}

	graph.plotLine({ 'standard': { m: 1, c: 0 }});

	graph.show();
});
