/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Graph = __webpack_require__(1);
	
	document.addEventListener('DOMContentLoaded', function () {
	
		var $canvas = document.createElement('canvas');
		$canvas.width = 500;
		$canvas.height = 600;
	
		document.body.appendChild($canvas);
	
		var context = $canvas.getContext('2d');
	
		var graph = new _Graph.Graph({
			context: context,
			labels: {
				x: 'foo',
				y: 'bar'
			},
			dimens: {
				width: $canvas.width,
				height: $canvas.height
			}
		});
	
		var getRandomNumber = function getRandomNumber(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};
	
		graph.setAxisX([-100, 100]).setAxisY([-100, 100]);
	
		for (var i = 0; i < 20; i++) {
			graph.plot(getRandomNumber(-100, 100), getRandomNumber(-100, 100));
		}
	
		graph.plotLine({ 'standard': { m: 1, c: 0 } });
	
		graph.show();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Graph = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Line = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Graph = exports.Graph = function () {
		_createClass(Graph, null, [{
			key: 'getMockContext',
	
	
			// Mock canvas context object for testing
			value: function getMockContext() {
	
				var fnNames = ['moveTo', 'lineTo', 'clearRect', 'arc'];
	
				var ctx = { calledFn: [] };
				var fn = function fn(name) {
					return function () {
						return ctx.calledFn.push(name);
					};
				};
	
				fnNames.forEach(function (name) {
					return ctx[name] = fn(name);
				});
	
				return ctx;
			}
		}]);
	
		function Graph(config) {
			_classCallCheck(this, Graph);
	
			// colors
			this.AXIS_COLOR = 'rgba(81, 128, 233, .8)';
			this.GRID_COLOR = 'rgba(0,0,0,.3)';
			this.CENTER_COLOR = '#e95051';
			this.DEFAULT_LINE_COLOR = '#888';
	
			this.AXIS_LIMIT_ERROR = 'The axis lower limit cannot be greater than the upper limit';
	
			this._ctx = config.context;
	
			// Dimensions(True dimensions)
			this.width = config.dimens.width;
			this.height = config.dimens.height;
	
			this.labels = {
				x: config.labels.x || '',
				y: config.labels.y || ''
			};
	
			this._init();
		}
	
		// Initialize state and state getters
	
	
		_createClass(Graph, [{
			key: '_init',
			value: function _init() {
				var _this = this;
	
				this.axis = {};
	
				// Figures
				this._points = [];
				this._lines = [];
	
				// Shift and transform origin
				this.point = {
					shiftX: function shiftX(x) {
						return _this.width / 2 - (_this.axis.x[1] + _this.axis.x[0]) + x;
					},
					shiftY: function shiftY(y) {
						return _this.height / 2 + (_this.axis.y[1] + _this.axis.y[0]) - y;
					}
				};
	
				// Scale point to the real canvas coordinates
				this.proportionX = function (x) {
					return _this.point.shiftX(x / _this.scale.x);
				};
				this.proportionY = function (y) {
					return _this.point.shiftY(y / _this.scale.y);
				};
	
				this.render = this.render.bind(this);
			}
	
			// Axes upper limit to lower limit length(pseudo dimensions)
	
		}, {
			key: 'show',
	
	
			// Render the graph and plot all figures
			value: function show() {
				requestAnimationFrame(this.render);
			}
	
			// Set the X axis limits
	
		}, {
			key: 'setAxisX',
			value: function setAxisX(limits) {
				if (limits[0] < limits[1]) this.axis.x = limits;else throw new Error(this.AXIS_LIMIT_ERROR);
				return this;
			}
	
			// Set the Y axis limits
	
		}, {
			key: 'setAxisY',
			value: function setAxisY(limits) {
				if (limits[0] < limits[1]) this.axis.y = limits;else throw new Error(this.AXIS_LIMIT_ERROR);
				return this;
			}
	
			// Add a point to the figures to render
	
		}, {
			key: 'plot',
			value: function plot(x, y) {
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#555';
	
				this._points.push({
					x: x,
					y: y,
					color: color
				});
	
				return this;
			}
	
			// Add a line to the figures to render
	
		}, {
			key: 'plotLine',
			value: function plotLine(prop) {
	
				if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'object') return;
	
				var equation = void 0;
	
				// Two point form
				if (_typeof(prop['2 points']) === 'object') equation = _Line.Line.toStandardForm(prop['2 points']);
	
				// Standard form
				else if (_typeof(prop.standard) === 'object') equation = [prop.standard.m, prop.standard.c];
	
				if (equation) this._lines.push(new _Line.Line(equation[0], equation[1]));
	
				return this;
			}
	
			// Draw a point on the graph
	
		}, {
			key: 'drawPoint',
			value: function drawPoint(x, y) {
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#555';
				var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
	
	
				this._ctx.beginPath();
				this._ctx.arc(this.proportionX(x), this.proportionY(y), size, 0, Math.PI * 2);
	
				this._ctx.save();
				this._ctx.fillStyle = color;
				this._ctx.fill();
				this._ctx.restore();
			}
	
			// Draw a line segment on the graph
	
		}, {
			key: 'drawSegment',
			value: function drawSegment(p1, p2) {
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#555';
				var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	
	
				this._ctx.lineWidth = size;
	
				this._ctx.beginPath();
				this._ctx.moveTo(this.proportionX(p1.x), this.proportionY(p1.y));
				this._ctx.lineTo(this.proportionX(p2.x), this.proportionY(p2.y));
	
				this._ctx.save();
				this._ctx.strokeStyle = color;
				this._ctx.stroke();
				this._ctx.restore();
			}
	
			// Draw a line(i.e. draw a segment i.e. a segment that extends to the boundaries of the graph)
	
		}, {
			key: 'drawLine',
			value: function drawLine(line, color, size) {
	
				var points = void 0;
	
				if (Math.abs(line.slope) > 1) {
	
					points = [{
						x: this.axis.x[0],
						y: line.getY(this.axis.x[0])
					}, {
						x: this.axis.x[1],
						y: line.getY(this.axis.x[1])
					}];
				} else {
	
					points = [{
						x: line.getX(this.axis.y[0]),
						y: this.axis.y[0]
					}, {
						x: line.getX(this.axis.y[1]),
						y: this.axis.y[1]
					}];
				}
	
				this.drawSegment(points[0], points[1], color, size);
			}
	
			// Render the axes
	
		}, {
			key: 'renderAxis',
			value: function renderAxis() {
	
				// Draw the y axis
				this.drawSegment({ x: this.axis.x[0], y: 0 }, { x: this.axis.x[1], y: 0 }, this.AXIS_COLOR);
	
				// Draw the x axis
				this.drawSegment({ x: 0, y: this.axis.y[0] }, { x: 0, y: this.axis.y[1] }, this.AXIS_COLOR);
	
				// Origin
				this.drawPoint(0, 0, this.CENTER_COLOR, 2);
			}
	
			// Render the grid
	
		}, {
			key: 'renderGrid',
			value: function renderGrid(size) {
	
				for (var i = 0; i <= this.dimens.x; i += size) {
	
					var x = i + size * Math.ceil(this.axis.x[0] / size);
	
					this.drawSegment({ x: x, y: this.axis.y[0] }, { x: x, y: this.axis.y[1] }, this.GRID_COLOR, .3);
				}
	
				for (var _i = 0; _i <= this.dimens.y; _i += size) {
	
					var y = _i + size * Math.ceil(this.axis.y[0] / size);
	
					this.drawSegment({ x: this.axis.x[0], y: y }, { x: this.axis.x[1], y: y }, this.GRID_COLOR, .3);
				}
			}
	
			// Render everything in the graph(all points, all segments, grid, axes, origin)
	
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				this._ctx.clearRect(0, 0, this.width, this.height);
	
				// Render a grid
				this.renderGrid(10);
	
				// Draw all points
				this._points.forEach(function (p) {
					return _this2.drawPoint(p.x, p.y, p.color);
				});
	
				// Draw all lines
				this._lines.forEach(function (line) {
					return _this2.drawLine(line, _this2.DEFAULT_LINE_COLOR);
				});
	
				// Render the axes
				this.renderAxis();
	
				// requestAnimationFrame(this.render);
			}
		}, {
			key: 'dimens',
			get: function get() {
				return {
					x: this.axis.x[1] - this.axis.x[0],
					y: this.axis.y[1] - this.axis.y[0]
				};
			}
	
			// The scale of the graph
	
		}, {
			key: 'scale',
			get: function get() {
				return {
					x: this.dimens.x / this.width,
					y: this.dimens.y / this.height
				};
			}
		}]);

		return Graph;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Line = exports.Line = function () {
		_createClass(Line, null, [{
			key: "toStandardForm",
			value: function toStandardForm(points) {
	
				var x1 = points[0][0],
				    x2 = points[1][0],
				    y1 = points[0][1],
				    y2 = points[1][1],
				    m = (y2 - y1) / (x2 - x1);
	
				return [m, y1 - x1 * m];
			}
		}]);
	
		function Line(m, c) {
			_classCallCheck(this, Line);
	
			this.m = m;
			this.c = c;
		}
	
		_createClass(Line, [{
			key: "getY",
			value: function getY(x) {
				return this.m * x + this.c;
			}
		}, {
			key: "getX",
			value: function getX(y) {
				return (y - this.c) / this.m;
			}
	
			// getNormalAt(x, y) {}
	
		}, {
			key: "slope",
			get: function get() {
				return this.m;
			}
		}]);

		return Line;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map