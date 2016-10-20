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
  if (this.y) {
    ctx.drawImage(document.getElementById("pipe1"), this.x, this.y, this.width, this.height);
  } else {
    ctx.drawImage(document.getElementById("pipe2"), this.x, this.y, this.width, this.height);
  }
  //  ctx.save();
  //  ctx.fillStyle = "#936dbc";
  //  ctx.fillRect(this.x, this.y, this.width, this.height);
  //  ctx.restore();
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

function PipeGenerator(pipes) {
  var _this = this;

  this.pipes = pipes;
  this.generatePipe();
  setInterval(function () {
    _this.generatePipe();
  }, 3000);
}

//PipeGenerator function
PipeGenerator.prototype.generatePipe = function () {
  var heightTop = Math.random() * 200 + 50;
  var heightBottom = 600 - heightTop - 250;
  var pipeTop = new _Pipe2.default(1000, 0, +3, 150, heightTop);
  var pipeBottom = new _Pipe2.default(1000, 610 - heightBottom, 3, 150, heightBottom);
  this.pipes.push(pipeTop);
  this.pipes.push(pipeBottom);
};

//second option to PipeGenerator function
// function generatePipe(pipes){
//   let heightTop = Math.random()*100+200;
//   let heightBottom = 600 - heightTop -150;
//   let pipeTop = new Pipe (1000, 0, +3, 150, heightTop);
//   let pipeBottom = new Pipe (1000, 600-heightBottom, 3, 150, heightBottom);
//   pipes.push(pipeTop);
//   pipes.push(pipeBottom);
//   console.log(pipes);
// }

exports.default = PipeGenerator;

},{"./Pipe.js":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Bird(x, y) {
  this.x = x;
  this.y = y;
  this.velY = 0;
  this.gravity = 1.5;
  this.sprites = [document.getElementById("bird1"), document.getElementById("bird2"), document.getElementById("bird3")];
  this.currentSprite = 0;
  this.updates = 0;
  this.angle = 0;
  this.spriteWidth = 90;
  this.spriteHeight = 50;
  this.initControls();
}

Bird.prototype.update = function () {
  this.updates++;
  this.angle = Math.PI * this.velY / 100;
  if (this.updates % 18 === 0) this.currentSprite = (this.currentSprite + 1) % this.sprites.length;
  this.velY += this.gravity;
  this.y += this.velY;
  if (this.y > 600 - this.spriteHeight / 2) {
    this.dead = true;
  }
};

Bird.prototype.render = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);

  ctx.drawImage(this.sprites[this.currentSprite], -this.spriteWidth / 2, -this.spriteHeight / 2, 90, 64);
  ctx.restore();
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

  Bird.prototype.detectCollisions = function (pipes) {
    var _this2 = this;

    var collisionDetected = false;
    pipes.forEach(function (pipe, index) {
      if (pipe.y < 10) {
        //up
        var a = _this2.x + _this2.spriteWidth / 2;
        var b = _this2.y - _this2.spriteHeight / 2;
        var x0 = pipe.x;
        var y0 = pipe.y + pipe.height;
        var x1 = pipe.x + pipe.width;
        if (a > x0 && a < x1 && b < y0) collisionDetected = true;
      } else {
        //down
        var _a = _this2.x + _this2.spriteWidth / 2;
        var _b = _this2.y - _this2.spriteHeight / 2;
        var _x = pipe.x;
        var _x2 = pipe.x + pipe.width;
        var y1 = pipe.y;
        if (_a > _x && _a < _x2 && _b > y1) collisionDetected = true;
      }
    });
    if (collisionDetected) {
      this.dead = true;
    }
  };
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
  new _PipeGenerator2.default(pipes);
  function initGameLoop() {
    player.detectCollisions(pipes);
    if (!player.dead) {
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
    } else {
      ctx.drawImage(document.getElementById("gameover"), 250, 160, 500, 280);
      document.getElementById("canvas").onclick = function () {
        location.reload();
      };
    }

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
  if (this.xOffset <= -450) this.xOffset = 0;
  this.xOffset--;
};

Scene.prototype.render = function (ctx) {
  for (var i = 0; i - 450 <= this.maxWidth; i += 449) {
    ctx.drawImage(this.bg, i + this.xOffset, 0, 450, 600);
  }
};

exports.default = new Scene(1000);

},{}]},{},[4]);
