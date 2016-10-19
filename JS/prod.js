(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
function Pipe(x, y, speed, width, height) {
   this.x = x;
   this.y = y;
   this.speed = speed;
   this.width = width;
   this.height = height;
}
Pipe.prototype.update = function () {
   this.x -= this.speed;
};

Pipe.prototype.render = function (ctx) {
   ctx.save();
   ctx.fillStyle = "#00E800";
   ctx.fillRect(this.x, this.y, this.width, this.height);
   ctx.restore();
};

exports.default = Pipe;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Pipe = require("./Pipe.js");

var _Pipe2 = _interopRequireDefault(_Pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generatePipe(pipes) {
  var heightTop = Math.random() * 100 + 200;
  var heightBottom = 600 - heightTop - 150;
  var pipeTop = new _Pipe2.default(1000, 0, +3, 150, heightTop);
  var pipeBottom = new _Pipe2.default(1000, 600 - heightBottom, 3, 150, heightBottom);
  pipes.push(pipeTop);
  pipes.push(pipeBottom);
  console.log(pipes);
}

exports.default = generatePipe;

},{"./Pipe.js":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Bird(x, y) {
  this.x = x;
  this.y = y;
  this.velY = 0;
  this.gravity = 2;
  this.sprites = [document.getElementById("bird1"), document.getElementById("bird2"), document.getElementById("bird3")];
  this.currentSprite = 0;
  this.updates = 0;
  this.initControls();
}

Bird.prototype.update = function () {
  this.updates++;
  if (this.updates % 18 === 0) this.currentSprite = (this.currentSprite + 1) % this.sprites.length;
  this.velY += this.gravity;
  this.y += this.velY;
};

Bird.prototype.render = function (ctx) {
  ctx.drawImage(this.sprites[this.currentSprite], this.x, this.y, 90, 64);
};

Bird.prototype.initControls = function () {
  var _this = this;

  document.addEventListener("keydown", function (e) {
    console.log(e.keyCode);
    if (e.keyCode === 32) {
      _this.velY = -20;
    }
  });

  window.addEventListener("touchstart", function (e) {
    _this.velY = -20;
  });
};

exports.default = Bird;

},{}],4:[function(require,module,exports){
"use strict";

var _scene = require("./scene.js");

var _scene2 = _interopRequireDefault(_scene);

var _bird = require("./bird.js");

var _bird2 = _interopRequireDefault(_bird);

var _PipeGenerator = require("./PipeGenerator.js");

var _PipeGenerator2 = _interopRequireDefault(_PipeGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var pipes = [];
window.onload = function () {
  var player = new _bird2.default(100, 300);
  setInterval(_PipeGenerator2.default, 3000, pipes);
  function initGameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    _scene2.default.update();
    _scene2.default.render(ctx);
    player.update();
    player.render(ctx);
    pipes.forEach(function (pipe, i) {
      if (pipe.x < -pipe.width) {
        delete pipes[i];
      } else {
        pipe.update();
        pipe.render(ctx);
      }
    });

    window.requestAnimationFrame(initGameLoop);
  }
  initGameLoop();
};

},{"./PipeGenerator.js":2,"./bird.js":3,"./scene.js":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Scene(mw) {
  this.bg = document.getElementById("bg");
  this.xOffset = 0;
  this.maxWidth = mw;
}

Scene.prototype.update = function () {
  if (this.xOffSet <= -450) this.xOffset = 0;
  this.xOffset--;
};

Scene.prototype.render = function (ctx) {
  for (var i = 0; i <= this.maxWidth + 450; i += 449) {
    ctx.drawImage(this.bg, i + this.xOffset, 0, 450, 600);
  }
};

exports.default = new Scene(1000);

},{}]},{},[4]);
