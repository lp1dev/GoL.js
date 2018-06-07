/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./game_modules/game.js":
/*!******************************!*\
  !*** ./game_modules/game.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Grid = __webpack_require__(/*! ./grid */ \"./game_modules/grid.js\")\n\nclass ExecutionStack {\n    constructor () {\n        this.instructions = {\"KILL\": this.kill, \"LIVE\": this.live}\n        this.stack = []\n    }\n    kill (cell) {\n        cell.alive = false\n    }\n    live (cell) {\n        cell.alive = true\n    }\n    push (cell, instruction) {\n        this.stack.push({cell: cell, instruction: instruction})\n    }\n    execute () {\n        this.stack.forEach((action) => {\n            if (Object.keys(this.instructions).includes(action.instruction)) {\n                this.instructions[action.instruction](action.cell)\n            } else {\n                console.error('ExecutionStack :: Unknown instruction', action)\n            }\n        })\n    }\n}\n\nclass Game {\n    constructor (seed, width=20, height=10) {\n        this.width = width\n        this.height = height\n        this.preset = this.buildPreset(seed)\n        this.executionStack = new ExecutionStack()\n        this.cycle = 0\n        console.log(`Game :: Creating new Game instance with\n                    \\twidth: ${width}\n                    \\theight: ${height}\n                    \\tpreset: \\n${this.preset}`)\n    }\n    buildPreset (seed) {\n        return seed\n    }\n    init () {\n        console.log('Game :: initialized')\n        this.grid = new Grid(this.preset, this.width, this.height)\n    }\n    next () {\n        const liveCells = this.grid.getLiveCells()\n        liveCells.forEach((liveCell) => {\n            // const liveNeighbours = this.grid.getLiveNeighbours(liveCell)\n            const neighbours = this.grid.getNeighbours(liveCell)\n            const liveNeighbours = neighbours.filter(cell => cell.alive)\n            if (liveNeighbours.length < 2) {\n                this.executionStack.push(liveCell, 'KILL')\n            } else if (liveNeighbours.length > 3) {\n                this.executionStack.push(liveCell, 'KILL')\n            }\n            neighbours.forEach((neighbour) => {\n                if (!neighbour.alive) {\n                    const liveNeighbours = this.grid.getLiveNeighbours(neighbour)\n                    if (liveNeighbours.length === 3) {\n                        neighbour.color_array = liveCell.color_array\n                        this.executionStack.push(neighbour, 'LIVE')\n                    }\n                }\n            })\n        })\n        this.executionStack.execute()\n        this.cycle++\n    }\n}\n\nmodule.exports = Game\n\n\n//# sourceURL=webpack:///./game_modules/game.js?");

/***/ }),

/***/ "./game_modules/grid.js":
/*!******************************!*\
  !*** ./game_modules/grid.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Cell {\n    constructor(x, y, alive=false, rgba=null, color_array=null) {\n        this.x = x\n        this.y = y\n        this.alive = alive\n        this.rgba = rgba\n        this.color_array = color_array\n    }\n}\n\nclass Grid {\n    constructor(preset, width, height) {\n        this.width = width\n        this.height = height\n        this.cells = {}\n        preset.forEach((line, y) => {\n            this.cells[y] = {}\n            line.forEach((pixel, x) => {\n                this.cells[y][x] = new Cell(x, y, \n                    pixel.rgba !== 'rgba(0,0,0,1)', \n                    pixel.rgba !== 'rgba(0,0,0,1)' ? pixel.rgba : null,\n                    pixel.array)\n            })\n        })\n    }\n    getLiveCells () {\n        const alive = []\n        for (let lineIndex in this.cells) {\n            const line = this.cells[lineIndex]\n            for (let cellIndex in line) {\n                if (line[cellIndex].alive) {\n                    alive.push(line[cellIndex])\n                }\n            }\n        }\n        return alive\n    }\n    getCell(y, x) {\n        if (!this.cells[y]) {\n            this.cells[y] = {}\n        }\n        if (!this.cells[y][x]) {\n            this.cells[y][x] = new Cell(x, y)\n        }\n        return this.cells[y][x]\n    }\n    getNeighbours (cell) {\n        const x = cell.x\n        const y = cell.y\n        const neighbours = []\n        neighbours.push(this.getCell(y - 1, x - 1))\n        neighbours.push(this.getCell(y - 1, x))\n        neighbours.push(this.getCell(y - 1, x + 1))\n        neighbours.push(this.getCell(y, x - 1))\n        neighbours.push(this.getCell(y, x + 1))\n        neighbours.push(this.getCell(y + 1, x - 1))\n        neighbours.push(this.getCell(y + 1, x))\n        neighbours.push(this.getCell(y + 1, x + 1))\n        return neighbours\n    }\n    getLiveNeighbours (cell) {\n        return this.getNeighbours(cell).filter((neighbour) => neighbour.alive)\n    }\n}\n\nmodule.exports = Grid\n\n\n//# sourceURL=webpack:///./game_modules/grid.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _game = __webpack_require__(/*! ../game_modules/game */ \"./game_modules/game.js\");\n\nvar _game2 = _interopRequireDefault(_game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar height = 0;\nvar width = 0;\nvar generation = 0;\nvar alive = 0;\nvar game = null;\nvar interval = null;\nvar speed = 50;\nvar pixelSize = 2;\nvar stopped = false;\nvar buffer = null;\nvar canvas = null;\nvar $ = function $() {\n    var _document;\n\n    return (_document = document).querySelector.apply(_document, arguments);\n};\n\nfunction setPixel(imageData, cell) {\n    var index = (cell.y + cell.x * imageData.width) * 4;\n    imageData.data[index + 0] = cell.color_array[0];\n    imageData.data[index + 1] = cell.color_array[1];\n    imageData.data[index + 2] = cell.color_array[2];\n    imageData.data[index + 3] = cell.color_array[3];\n}\n\nfunction drawPixels(imageData, x, y, cell) {\n    setPixel(imageData, cell);\n    // {\n    //     x: x * pixelSize,\n    //     y: y * pixelSize,\n    //     r: cell.color_array[0],\n    //     g: cell.color_array[1],\n    //     b: cell.color_array[2],\n    //     a: cell.color_array[3]\n    //   });\n\n    // for(let j = 0; j < pixelSize; j++){\n    //     for(let k = 0; k < pixelSize; k++){\n    //      setPixel( imageData, {\n    //          x: x * pixelSize + j,  \n    //          y: y * pixelSize + k,\n    //          r: cell.color_array[0],\n    //          g: cell.color_array[1],\n    //          b: cell.color_array[2],\n    //          a: cell.color_array[3]\n    //        });\n    //       }\n    //   }\n}\n\nfunction pre_render(grid, canvas, context) {\n\n    var imageData = context.createImageData(canvas.width, canvas.height);\n\n    for (var x = 0; x < height; x++) {\n        var line = grid.cells[x];\n        for (var y = 0; y < width; y++) {\n            var cell = line[y];\n            if (cell && cell.alive) {\n                alive++;\n                // context.fillStyle = cell.rgba\n                // context.fillRect(x, y, 1, 1)\n                drawPixels(imageData, x, y, cell);\n            }\n        }\n    }\n    buffer.getContext('2d').putImageData(imageData, 0, 0);\n    return buffer;\n}\n\nfunction updateGrid(grid) {\n    console.log('updateGrid');\n    alive = 0;\n    var context = canvas.getContext('2d');\n    var buffer = pre_render(grid, canvas, context);\n    // context.imageSmoohingEnabled = false    \n    context.clearRect(0, 0, canvas.width, canvas.height);\n    context.drawImage(buffer, 0, 0);\n    // context.putImageData(imageData, 0, 0)\n}\n\nfunction initSeeds() {\n    var seeds = 5;\n    var seedsEl = $('#seeds');\n    var output = '';\n    for (var i = 0; i < seeds; i++) {\n        output += '<img id=\"seed' + i + '\" src=\"./seeds/test' + i + '.bmp\" alt=\"seed' + i + '\" onclick=\"select(' + i + ')\"/>';\n    }\n    seedsEl.innerHTML = output;\n}\n\nfunction init(seed) {\n    height = seed.length;\n    width = seed[0].length;\n    game = new _game2.default(seed, width, height);\n    game.init(seed);\n    buffer = document.createElement('canvas');\n    canvas = $('#grid');\n    $('#generation').innerText = 'Generation 0';\n    updateGrid(game.grid);\n    playPause(true);\n}\n\nfunction next() {\n    // game.next()\n    updateGrid(game.grid);\n    $('#generation').innerHTML = 'Generation : <b>' + ++generation + '</b><br/>Alive : <b>' + alive + '</b>';\n}\n\nfunction playPause() {\n    var forceValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n\n    if (forceValue) {\n        stopped = forceValue;\n    } else {\n        stopped = !stopped;\n    }\n    $('#stop').innerText = stopped ? 'Start' : 'Stop';\n    if (stopped) {\n        clearInterval(interval);\n    } else {\n        interval = setInterval(next, speed);\n    }\n}\n\nfunction imageLoaded(img, context, canvas) {\n    var imgData = context.getImageData(0, 0, canvas.height, canvas.width);\n    var BMPSeed = new Array();\n\n    for (var i = 0; i < canvas.height; i++) {\n        BMPSeed[i] = new Array();\n        for (var j = 0; j < canvas.width; j++) {\n            var data = context.getImageData(i, j, 1, 1).data;\n            BMPSeed[i][j] = {\n                rgba: 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] / 255 + ')',\n                array: [data[0], data[1], data[2], data[3]]\n            };\n        }\n    }\n    init(BMPSeed);\n    // canvas.style.display = 'none'\n}\n\nfunction loadSeed(id) {\n    generation = 0;\n    $('#generation').innerText = 'Loading Seed ' + id + '...';\n    var canvas = $('#grid');\n    var context = canvas.getContext('2d');\n    var img = $('#seed' + id);\n    context.drawImage(img, 0, 0);\n    if (!img.complete || img.naturalWidth === 0) {\n        img.onload = function () {\n            console.log('onload') && imageLoaded(context, canvas);\n        };\n    } else {\n        imageLoaded(img, context, canvas);\n    }\n}\n\nfunction onDOMContentLoaded() {\n    initSeeds();\n    $('#stop').onclick = function () {\n        return playPause();\n    };\n}\n\nfunction changeSpeed(value) {\n    speed = value;\n    playPause(true);\n    playPause(false);\n}\n\nwindow.select = loadSeed;\nwindow.next = next;\nwindow.changeSpeed = changeSpeed;\n\ndocument.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });