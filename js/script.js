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
		$canvas.height = 500;
	
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
	
		graph.setAxisX([-100, 100]);
		graph.setAxisY([-100, 100]);
	
		graph.plot(25, 25);
		graph.plot(50, 50);
	
		graph.plot(-25, 25);
		graph.plot(50, -50);
	
		graph.addLine({
			'standard': { m: 1, c: 50 }
		});
	
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
	
	
			// Mock context object for drawing
			value: function getMockContext() {
	
				var fnNames = ['moveTo', 'lineTo', 'clearRect', 'arc'];
	
				var self = { calledFn: [] };
				var fn = function fn(name) {
					return function () {
						return self.calledFn.push(name);
					};
				};
	
				fnNames.forEach(function (name) {
					return self[name] = fn(name);
				});
	
				return self;
			}
		}]);
	
		function Graph(config) {
			_classCallCheck(this, Graph);
	
			this.AXIS_COLOR = 'rgba(81, 128, 233, .7)';
			this.CENTER_COLOR = '#e95051';
	
			this._ctx = config.context;
	
			this.width = config.dimens.width;
			this.height = config.dimens.height;
	
			this.labels = {
				x: config.labels.x || '',
				y: config.labels.y || ''
			};
	
			this._init();
		}
	
		// 
	
	
		_createClass(Graph, [{
			key: '_init',
			value: function _init() {
				var _this = this;
	
				this._points = [];
				this.axis = {};
				this._lines = [];
	
				this.proportionX = function (x) {
					return _this.point.shiftX(x / _this.scale.x);
				};
				this.proportionY = function (y) {
					return _this.point.shiftY(y / _this.scale.y);
				};
			}
		}, {
			key: 'show',
			value: function show() {
				this.render();
			}
		}, {
			key: 'setAxisX',
			value: function setAxisX(limits) {
				if (limits[0] < limits[1]) this.axis.x = limits;else throw new Error('The axis lower limit cannot be greater than the upper limit');
			}
		}, {
			key: 'setAxisY',
			value: function setAxisY(limits) {
				if (limits[0] < limits[1]) this.axis.y = limits;else throw new Error('The axis lower limit cannot be greater than the upper limit');
			}
		}, {
			key: 'plot',
			value: function plot(x, y) {
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#555';
	
				this._points.push({
					x: this.proportionX(x),
					y: this.proportionY(y),
					color: color
				});
			}
		}, {
			key: 'addLine',
			value: function addLine(prop) {
	
				var equation = void 0;
	
				if (_typeof(prop['2 points']) === 'object') equation = _Line.Line.toStandardForm(prop['2 points']);else if (_typeof(prop.standard) === 'object') equation = [prop.standard.m, prop.standard.c];
	
				if (equation) this._lines.push(new _Line.Line(equation[0], equation[1]));
			}
		}, {
			key: 'drawPoint',
			value: function drawPoint(x, y) {
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#555';
				var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;
	
	
				this._ctx.beginPath();
				this._ctx.arc(x, y, size, 0, Math.PI * 2);
	
				this._ctx.save();
				this._ctx.fillStyle = color;
				this._ctx.fill();
				this._ctx.restore();
			}
		}, {
			key: 'drawSegment',
			value: function drawSegment(p1, p2) {
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#555';
	
	
				this._ctx.beginPath();
				this._ctx.moveTo(p1.x, p1.y);
				this._ctx.lineTo(p2.x, p2.y);
	
				this._ctx.save();
				this._ctx.strokeStyle = color;
				this._ctx.stroke();
				this._ctx.restore();
			}
		}, {
			key: 'drawLine',
			value: function drawLine(line) {
				var _this2 = this;
	
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
	
				points = points.map(function (p) {
					return {
						x: _this2.proportionX(p.x),
						y: _this2.proportionY(p.y)
					};
				});
	
				this.drawSegment(points[0], points[1]);
			}
		}, {
			key: 'renderAxis',
			value: function renderAxis() {
	
				// Draw the y axis
				this.drawSegment({ x: this.width, y: this.point.shiftY(0) }, { x: 0, y: this.point.shiftY(0) }, this.AXIS_COLOR);
	
				// Draw the x axis
				this.drawSegment({ x: this.point.shiftX(0), y: 0 }, { x: this.point.shiftX(0), y: this.height }, this.AXIS_COLOR);
	
				// Origin
				this.drawPoint(this.point.shiftX(0), this.point.shiftY(0), this.CENTER_COLOR, 2);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;
	
				this._ctx.clearRect(0, 0, this.width, this.height);
	
				// Draw all points
				this._points.forEach(function (p) {
					return _this3.drawPoint(p.x, p.y, p.color);
				});
	
				// Draw all lines
				this._lines.forEach(function (l) {
					return _this3.drawLine(l);
				});
	
				this.renderAxis();
			}
		}, {
			key: 'point',
			get: function get() {
				var _this4 = this;
	
				return {
					shiftX: function shiftX(x) {
						return _this4.width / 2 - (_this4.axis.x[0] + _this4.axis.x[1]) / 2 + x;
					},
					shiftY: function shiftY(y) {
						return _this4.height / 2 + (_this4.axis.y[0] + _this4.axis.y[1]) / 2 - y;
					}
				};
			}
		}, {
			key: 'scale',
			get: function get() {
				return {
					x: (this.axis.x[1] - this.axis.x[0]) / this.width,
					y: (this.axis.y[1] - this.axis.y[0]) / this.height
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
	
			this.m = m || 1;
			this.c = c || 0;
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