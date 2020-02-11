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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Ball; });\nclass Ball {\n    constructor(color, posX) {\n        this.color = color;\n        this.posX = posX;\n        this.posY = 150;\n        this.vel = Math.random() + 1;\n        this.radius = 50;\n        this.health = 100;\n        this.attackStrength = 0; \n        this.direction = 'up';\n    }\n\n    step() {\n        if (this.direction === 'up') {\n            this.posY -= this.vel;\n            if (this.posY <= 100) this.direction = 'down';\n        } else {\n            this.posY += this.vel;\n            if (this.posY >= 150) this.direction = \"up\";\n        }\n    }\n\n    draw(ctx) {\n        ctx.beginPath();\n        ctx.arc(this.posX + 25, this.posY, this.radius, 0, 2 * Math.PI, false);\n        ctx.fillStyle = this.color;\n        ctx.fill();\n        ctx.lineWidth = 2;\n        ctx.strokeStyle = '#000';\n        ctx.stroke();\n        ctx.fillStyle = '#000';\n        ctx.font = \"30px Arial\";\n        ctx.fillText(this.health, this.posX, this.posY + 10);\n    }\n}\n\n//# sourceURL=webpack:///./src/ball.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\nclass Game {\n    constructor(ctx) {\n        this.ctx = ctx;\n        this.players = [];\n        this.currentPlayer = 1;\n        this.choseSwitch = false;\n\n        this.createPlayers();\n        this.animate();\n        this.bindEventHandlers();\n\n        this.animate = this.animate.bind(this);\n        this.drawPlayerOptions = this.drawPlayerOptions.bind(this);\n        this.handleBallSelect = this.handleBallSelect.bind(this);\n        this.handleOptionSelect = this.handleOptionSelect.bind(this);\n        this.swapBall = this.swapBall.bind(this);\n        this.handleAttack = this.handleAttack.bind(this);\n        this.swapPlayers = this.swapPlayers.bind(this);\n        this.finishTurn = this.finishTurn.bind(this);\n        this.calculateDamage = this.calculateDamage.bind(this);\n    }\n\n    createPlayers() {\n        const player1 = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Ash Ketchum', 1);\n        const player2 = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Misty', 2);\n\n        this.players.push(player1);\n        this.players.push(player2);\n    }\n\n    animate() {\n        this.ctx.clearRect(0, 0, 500, 700);\n\n        this.drawPlayerOptions();\n\n        this.players.forEach(player => {\n            player.step();\n            player.draw(this.ctx);\n        });\n\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    drawPlayerOptions() {\n        this.ctx.fillStyle = \"#000\";\n        this.ctx.font = \"20px Arial\";\n        this.ctx.fillText(`Player ${this.currentPlayer}'s Turn:`, 200, 450);\n        this.ctx.fillText(`Attack`, 120, 540);\n        this.ctx.fillText(`Switch`, 370, 540);\n\n        this.ctx.beginPath();\n        this.ctx.rect(50, 500, 200, 70);\n        this.ctx.stroke();\n\n        this.ctx.beginPath();\n        this.ctx.rect(300, 500, 200, 70);\n        this.ctx.stroke();\n    }\n\n    bindEventHandlers() {\n        const canvas = document.getElementById('canvas');\n\n        canvas.addEventListener('click', e => {\n            const [x, y] = [e.x, e.y];\n\n            if (y >= 340 && y <= 380) {\n                this.handleBallSelect(x);\n            } else if (y >= 510 && y <= 580) {\n                this.handleOptionSelect(x);\n            }\n        })\n    }\n\n    handleBallSelect(x) {\n        if (x > 290 && this.currentPlayer === 1 || x < 290 && this.currentPlayer === 2) return;\n\n        const ballMap = {\n            47: 0,\n            93: 1, \n            139: 2,\n            183: 3,\n            347: 0,\n            393: 1,\n            438: 2,\n            484: 3\n        }\n\n        let selectedBall;\n\n        Object.keys(ballMap).forEach(ballX => {\n            if (x >= ballX && x <= ballX + 40) {\n              selectedBall = ballMap[ballX];\n            }\n        });\n\n        this.swapBall(selectedBall);\n    }\n\n    handleOptionSelect(x) {\n        if (x >= 58 && x <= 256) {\n            this.handleAttack();\n        } else if (x >= 308 && x <= 508) {\n            alert('Choose a ball');\n            this.choseSwitch = true;\n        }\n    }\n\n    swapBall(selectedBall) {\n        const currentPlayer = this.players[this.currentPlayer - 1];\n\n        if (this.choseSwitch) {\n            currentPlayer.currentBall = currentPlayer.balls[selectedBall];\n            currentPlayer.swapped = true;\n            this.choseSwitch = false;\n\n            if (this.currentPlayer === 2) {\n              this.finishTurn();\n            }\n\n            this.swapPlayers();\n        }\n    }\n\n    handleAttack() {\n        const currentPlayer = this.players[this.currentPlayer - 1];\n        currentPlayer.currentBall.attackStrength = Math.floor(Math.random() * 70) + 10;\n\n        if (this.currentPlayer === 2) {\n            this.finishTurn();  \n        } \n\n        this.swapPlayers();\n    }\n\n    swapPlayers() {\n        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;\n    }\n\n    finishTurn() {\n        const [player1, player2] = this.players;\n\n        if (player1.swapped && !player2.swapped) {\n            this.calculateDamage(player2, player1);\n        } else if (!player1.swapped && player2.swapped) {\n            this.calculateDamage(player1, player2)\n        } else if (!player1.swapped && !player2.swapped) {\n            // Choose random winner \n            const randomPlayer = Math.floor(Math.random() * 2);\n            const otherPlayer = randomPlayer === 0 ? 1 : 0;\n            const winnerOfRound = this.players[randomPlayer];\n            const loserOfRound = this.players[otherPlayer];\n\n            this.calculateDamage(winnerOfRound, loserOfRound)\n        }\n\n        this.players.forEach(player => {\n            player.swapped = false;\n\n            if (player.lost()) {\n                const winner = player.ord === 1 ? 2 : 1;\n                alert(`Player ${winner} wins!`);\n                window.location.reload();\n            }\n        });\n\n    }\n\n    calculateDamage(winner, loser) {\n        let nextHealth = loser.currentBall.health - winner.currentBall.attackStrength;\n        nextHealth = nextHealth < 0 ? 0 : nextHealth;\n        loser.currentBall.health = nextHealth;\n\n        if (loser.currentBall.health === 0) {\n            loser.selectNewBall();\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById('canvas');\n    const ctx = canvas.getContext('2d');\n    new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball */ \"./src/ball.js\");\n\n\nclass Player {\n    constructor(name, ord) {\n       this.name = name;\n       this.ord = ord;\n       this.posX = ord === 1 ? 100 : 400;\n       this.swapped = false;\n\n       this.balls = [];\n       this.createBalls();\n       this.currentBall = this.balls[0];\n\n       this.createBalls = this.createBalls.bind(this);\n       this.shuffle = this.shuffle.bind(this);\n       this.selectNewBall = this.selectNewBall.bind(this);\n       this.lost = this.lost.bind(this);\n    }\n\n    createBalls() {\n        const colors = ['red', 'blue', 'green', 'yellow'];\n\n        for (let i = 0; i < 4; i++) {\n            const color = colors[i];\n            const ball = new _ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"](color, this.posX);\n            this.balls.push(ball);\n        }\n\n        this.balls = this.shuffle(this.balls);\n    }\n\n    shuffle(array) {\n        for (let i = array.length - 1; i > 0; i--) {\n            const j = Math.floor(Math.random() * (i + 1));\n            [array[i], array[j]] = [array[j], array[i]];\n        }\n        return array;\n    }\n\n    step() {\n        this.currentBall.step();\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = \"#000\";\n        ctx.font = \"20px Arial\";\n        ctx.fillText(`Player ${this.ord}`, this.posX - 10, 300);\n\n        this.balls.forEach((ball, i) => {\n            const color = ball.health <= 0 ? '#000' : ball.color;\n            const posX = (this.posX - 40) + (i * 45);\n\n            ctx.beginPath();\n            ctx.arc(posX, 350, 20, 0, 2 * Math.PI, false);\n            ctx.fillStyle = color;\n            ctx.fill();\n            ctx.lineWidth = 2;\n            ctx.strokeStyle = \"#000\";\n            ctx.stroke();\n            ctx.fillStyle = \"#000\";\n            ctx.font = \"10px Arial\";\n            ctx.fillText(ball.health, posX - 8, 353);\n        });\n\n        this.currentBall.draw(ctx);\n    }\n\n    selectNewBall() {\n        this.balls.forEach(ball => {\n            if (ball.health > 0) {\n                this.currentBall = ball;\n            }\n        })\n    }\n\n    lost() {\n        let lost = true;\n\n        this.balls.forEach(ball => {\n            if (ball.health > 0) {\n                lost = false;\n            }\n        })\n\n        return lost;\n    }\n}\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });