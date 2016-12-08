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
	
		// graph.plot(50, 50);
		// graph.plot(25, 25);
	
		graph.start();
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
			value: function getMockContext() {
	
				var fn = function fn() {};
	
				return {
					lineTo: fn, moveTo: fn, clearRect: fn
				};
			}
		}]);
	
		function Graph(config) {
			_classCallCheck(this, Graph);
	
			this.DEFAULT_AXIS = [0, 200];
			this.OFFSET = 30;
	
			this._points = [];
			this._axis = {};
			this._lines = [];
	
			this._ctx = config.context;
	
			this.width = config.dimens.width;
			this.height = config.dimens.height;
	
			this._labels = {
				x: config.labels.x || '',
				y: config.labels.y || ''
			};
		}
	
		_createClass(Graph, [{
			key: 'start',
			value: function start() {
	
				this.render();
			}
		}, {
			key: 'setAxisX',
			value: function setAxisX(limits) {
				this._axis.x = limits;
			}
		}, {
			key: 'setAxisY',
			value: function setAxisY(limits) {
				this._axis.y = limits;
			}
		}, {
			key: 'plot',
			value: function plot(x, y) {
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#555';
	
	
				this._points.push({
					x: this.point.getX(x),
					y: this.point.getY(y),
					color: color
				});
			}
		}, {
			key: '_getLineEquation',
			value: function _getLineEquation(m, c) {
				return function (x) {
					return m * x + c;
				};
			}
		}, {
			key: 'addLine',
			value: function addLine(prop) {
	
				var equation = void 0;
	
				if (_typeof(prop['2 points']) === 'object') equation = _Line.Line.toStandardForm(prop['2 points']);else if (_typeof(prop['standard']) === 'object') equation = [prop['standard'].m, prop['standard'].c];
	
				if (equation) this._lines.push(new _Line.Line(equation));
			}
		}, {
			key: 'drawPoint',
			value: function drawPoint(x, y) {
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#555';
				var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;
	
	
				console.log(x, y, color);
				this._ctx.beginPath();
				this._ctx.arc(x, y, size, 0, Math.PI * 2);
	
				this._ctx.save();
				this._ctx.fillStyle = color;
				this._ctx.fill();
				this._ctx.restore();
			}
		}, {
			key: 'relativeToOrigin',
			value: function relativeToOrigin(originX, originY) {
				return {
					getX: function getX(x) {
						return originX + x;
					},
					getY: function getY(y) {
						return originY - y;
					}
				};
			}
		}, {
			key: 'rendeAxis',
			value: function rendeAxis() {
	
				this._ctx.beginPath();
				this._ctx.moveTo(this.width, this.point.getY(0));
				this._ctx.lineTo(0, this.point.getY(0));
	
				this._ctx.moveTo(this.point.getX(0), 0);
				this._ctx.lineTo(this.point.getX(0), this.height);
	
				this._ctx.strokeStyle = '#5180e9';
				this._ctx.stroke();
	
				this.drawPoint(this.point.getX(0), this.point.getY(0), 'red', 2);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this = this;
	
				this._ctx.clearRect(0, 0, this.width, this.height);
	
				this.rendeAxis();
	
				this._points.forEach(function (p) {
					_this.drawPoint(p.x, p.y, p.color);
				});
			}
		}, {
			key: 'point',
			get: function get() {
				return this.relativeToOrigin(this.width / 2 - (this.axis.x[0] + this.axis.x[1]) / 2, this.height / 2 - (this.axis.y[0] + this.axis.y[1]) / 2);
			}
		}, {
			key: 'axis',
			get: function get() {
				return Object.create(this._axis);
			}
		}, {
			key: 'labels',
			get: function get() {
				return Object.create(this._labels);
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
		}]);

		return Line;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map