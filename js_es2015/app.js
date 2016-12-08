
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
		}
	});
});
