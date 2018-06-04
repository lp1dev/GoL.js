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

/***/ "../../../../usr/lib/node_modules/webpack/node_modules/process/browser.js":
/*!*************************************************!*\
  !*** (webpack)/node_modules/process/browser.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///(webpack)/node_modules/process/browser.js?");

/***/ }),

/***/ "./game_modules/game.js":
/*!******************************!*\
  !*** ./game_modules/game.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Grid = __webpack_require__(/*! ./grid */ \"./game_modules/grid.js\")\n\nclass ExecutionStack {\n    constructor () {\n        this.instructions = {\"KILL\": this.kill, \"LIVE\": this.live}\n        this.stack = []\n    }\n    kill (cell) {\n        cell.alive = false\n    }\n    live (cell) {\n        cell.alive = true\n    }\n    push (cell, instruction) {\n        this.stack.push({cell: cell, instruction: instruction})\n    }\n    execute () {\n        this.stack.forEach((action) => {\n            if (Object.keys(this.instructions).includes(action.instruction)) {\n                this.instructions[action.instruction](action.cell)\n            } else {\n                console.error('ExecutionStack :: Unknown instruction', action)\n            }\n        })\n    }\n}\n\nclass Game {\n    constructor (seed, width=20, height=10) {\n        this.width = width\n        this.height = height\n        this.preset = this.buildPreset(seed)\n        this.executionStack = new ExecutionStack()\n        this.cycle = 0\n        console.log(`Game :: Creating new Game instance with\n                    \\twidth: ${width}\n                    \\theight: ${height}\n                    \\tpreset: \\n${this.preset}`)\n    }\n    buildPreset (seed) {\n        return seed\n    }\n    init () {\n        console.log('Game :: initialized')\n        this.grid = new Grid(this.preset, this.width, this.height)\n    }\n    next () {\n        const liveCells = this.grid.getLiveCells()\n        liveCells.forEach((cell) => {\n            const liveNeighbours = this.grid.getLiveNeighbours(cell)\n            const neighbours = this.grid.getNeighbours(cell)\n            if (liveNeighbours.length < 2) {\n                this.executionStack.push(cell, 'KILL')\n            } else if (liveNeighbours.length > 3) {\n                this.executionStack.push(cell, 'KILL')\n            }\n            neighbours.forEach((cell) => {\n                if (!cell.alive) {\n                    const liveNeighbours = this.grid.getLiveNeighbours(cell)\n                    if (liveNeighbours.length === 3) {\n                        this.executionStack.push(cell, 'LIVE')\n                    }\n                }\n            })\n        })\n        this.executionStack.execute()\n        this.cycle++\n    }\n}\n\nmodule.exports = Game\n\n\n//# sourceURL=webpack:///./game_modules/game.js?");

/***/ }),

/***/ "./game_modules/grid.js":
/*!******************************!*\
  !*** ./game_modules/grid.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {class Cell {\n    constructor(x, y, alive=false, color=null) {\n        this.x = x\n        this.y = y\n        this.alive = alive\n        this.color = color\n    }\n}\n\nclass Grid {\n    constructor(preset, width, height) {\n        this.width = width\n        this.height = height\n        this.cells = {}\n        preset.forEach((line, y) => {\n            this.cells[y] = {}\n            line.forEach((pixel, x) => {\n                this.cells[y][x] = new Cell(x, y, \n                    pixel !== 'rgba(0,0,0,1)', \n                    pixel !== 'rgba(0,0,0,1)' ? pixel : null)\n            })\n        })\n    }\n    print () {\n        for (let y = 0; y < this.height; y++) {\n            const line = this.cells[y]\n            for (let x = 0; x < this.width; x++) {\n                process.stdout.write(line[x].alive ? '0' : ' ')\n            }\n            process.stdout.write('\\n')\n        }\n    }\n    getLiveCells () {\n        const alive = []\n        for (let lineIndex in this.cells) {\n            const line = this.cells[lineIndex]\n            for (let cellIndex in line) {\n                if (line[cellIndex].alive) {\n                    alive.push(line[cellIndex])\n                }\n            }\n        }\n        return alive\n    }\n    getCell(y, x) {\n        if (!this.cells[y]) {\n            this.cells[y] = {}\n        }\n        if (!this.cells[y][x]) {\n            this.cells[y][x] = new Cell(x, y)\n        }\n        return this.cells[y][x]\n    }\n    getNeighbours (cell) {\n        const x = cell.x\n        const y = cell.y\n        const neighbours = []\n        neighbours.push(this.getCell(y - 1, x - 1))\n        neighbours.push(this.getCell(y - 1, x))\n        neighbours.push(this.getCell(y - 1, x + 1))\n        neighbours.push(this.getCell(y, x - 1))\n        neighbours.push(this.getCell(y, x + 1))\n        neighbours.push(this.getCell(y + 1, x - 1))\n        neighbours.push(this.getCell(y + 1, x))\n        neighbours.push(this.getCell(y + 1, x + 1))\n        return neighbours\n    }\n    getLiveNeighbours (cell) {\n        return this.getNeighbours(cell).filter((neighbour) => neighbour.alive)\n    }\n}\n\nmodule.exports = Grid\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../usr/lib/node_modules/webpack/node_modules/process/browser.js */ \"../../../../usr/lib/node_modules/webpack/node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./game_modules/grid.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _game = __webpack_require__(/*! ../game_modules/game */ \"./game_modules/game.js\");\n\nvar _game2 = _interopRequireDefault(_game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar height = 0;\nvar width = 0;\nvar generation = 0;\nvar game = null;\nvar interval = null;\nvar stopped = false;\nvar defaultColor = 'rgba(0,0,0,1)';\nvar $ = function $() {\n    var _document;\n\n    return (_document = document).querySelector.apply(_document, arguments);\n};\n\nfunction updateGrid(grid) {\n    generation++;\n    var DOMGrid = $('#grid');\n    var output = '';\n    output += '<svg viewBox=\"0 0 ' + grid.height + ' ' + grid.width + '\" xmlns=\"http://www.w3.org/2000/svg\">';\n    for (var x = 0; x < height; x++) {\n        var line = Object.keys(grid.cells).includes(x.toString()) ? grid.cells[x] : null;\n        for (var y = 0; y < width; y++) {\n            var cell = line && Object.keys(line).includes(y.toString()) ? line[y] : null;\n            if (cell && cell.alive) {\n                if (!cell.color) {\n                    cell.color = defaultColor;\n                    console.log('defaultColor', defaultColor);\n                }\n                output += '<rect class=\"cell\" x=\"' + x + '\" y=\"' + y + '\" width=\"1\" height=\"1\" style=\"fill: ' + cell.color + '; stroke: ' + cell.color + '\"/>';\n            }\n        }\n    }\n    output += '</svg>';\n    DOMGrid.innerHTML = output;\n}\n\nfunction initControls() {\n    var stop = $('#stop');\n    stop.onclick = function () {};\n    $('#stop').onclick = function () {\n        stopped = !stopped;\n        stop.innerText = stopped ? 'Start' : 'Stop';\n    };\n}\n\nfunction initSeeds() {\n    var seeds = 5;\n    var seedsEl = $('#seeds');\n    var output = '';\n    for (var i = 1; i < seeds; i++) {\n        output += '<img id=\"seed' + i + '\" src=\"./seeds/test' + i + '.bmp\" alt=\"seed' + i + '\" onclick=\"select(' + i + ')\"/>';\n    }\n    seedsEl.innerHTML = output;\n}\n\nfunction init(seed) {\n    height = seed.length;\n    width = seed[0].length;\n    game = new _game2.default(seed, width, height);\n    game.init(seed);\n    updateGrid(game.grid);\n    $('#generation').innerText = 'Generation 0';\n    if (interval) {\n        clearInterval(interval);\n    }\n    interval = setInterval(function () {\n        if (!stopped) {\n            game.next();\n            updateGrid(game.grid);\n            $('#generation').innerText = 'Generation ' + generation;\n        }\n    }, 100);\n}\n\nfunction onDOMContentLoaded() {\n    initSeeds();\n    initControls();\n    $('#generation').innerText = '';\n}\n\nfunction imageLoaded(img, context, canvas) {\n    var imgData = context.getImageData(0, 0, canvas.height, canvas.width);\n    var BMPSeed = new Array();\n\n    for (var i = 0; i < canvas.height; i++) {\n        BMPSeed[i] = new Array();\n        for (var j = 0; j < canvas.width; j++) {\n            var data = context.getImageData(i, j, 1, 1).data;\n            BMPSeed[i][j] = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] / 255 + ')';\n            if (BMPSeed[i][j] !== 'rgba(0,0,0,1)' && defaultColor !== BMPSeed[i][j]) {\n                defaultColor = BMPSeed[i][j];\n            }\n        }\n    }\n    init(BMPSeed);\n    canvas.style.display = 'none';\n}\n\nfunction loadSeed(id) {\n    generation = 0;\n    stopped = true;\n    stop.innerText = stopped ? 'Start' : 'Stop';\n    $('#generation').innerText = 'Loading Seed ' + id + '...';\n    var canvas = $('#hidden-canvas');\n    var context = canvas.getContext('2d');\n    var img = $('#seed' + id);\n    context.drawImage(img, 0, 0);\n    if (!img.complete || img.naturalWidth === 0) {\n        img.onload = function () {\n            console.log('onload') && imageLoaded(context, canvas);\n        };\n    } else {\n        imageLoaded(img, context, canvas);\n    }\n}\n\nwindow.select = loadSeed;\n\ndocument.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });