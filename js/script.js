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
			}
		});
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
	
			this._points = [];
			this._axis = {};
			this._lines = [];
	
			this._ctx = config.context;
	
			this._labels = {
				x: config.labels.x || '',
				y: config.labels.y || ''
			};
		}
	
		_createClass(Graph, [{
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
			value: function plot(x, y, color) {
				this._points.push({ x: x, y: y, color: color });
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
	
				if (_typeof(prop['2 points']) === 'object') equation = _Line.Line.twoPointToStandard(prop['2 points']);else if (_typeof(prop['standard']) === 'object') equation = prop['standard'];
	
				if (equation) this._lines.push(new _Line.Line(equation));
			}
		}, {
			key: 'rendeAxis',
			value: function rendeAxis() {
	
				// this._ctx.moveTo()
			}
		}, {
			key: 'render',
			value: function render() {
				// Ctx rendering logic
	
				// this._ctx.clearReact(0, 0, )
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
			key: "twoPointToStandard",
			value: function twoPointToStandard(points) {
	
				var x1 = points[0][0],
				    x2 = points[1][0],
				    y1 = points[0][1],
				    y2 = points[1][1],
				    m = (y2 - y1) / (x2 - x1);
	
				return function (x) {
					return m * x + (y1 - x1 * m);
				};
			}
		}]);
	
		function Line(eqn) {
			_classCallCheck(this, Line);
	
			this.equation = eqn;
		}
	
		_createClass(Line, [{
			key: "getY",
			value: function getY(x) {
				return this.equation(x);
			}
		}]);

		return Line;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map