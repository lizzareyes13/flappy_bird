const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
import scene from "./scene.js";
import Bird from "./bird.js";
import generatePipe from "./PipeGenerator.js";
const pipes = [];
window.onload = function(){
  let player = new Bird(100,300);
  setInterval(generatePipe,3000,pipes);
  function initGameLoop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    scene.update();
    scene.render(ctx);
    player.update();
    player.render(ctx);
    pipes.forEach(function(pipe, i){
      if(pipe.x < -pipe.width){
          delete pipes[i];
        }
      else {
        pipe.update();
        pipe.render(ctx);
      }
    });

    window.requestAnimationFrame(initGameLoop);
  }
  initGameLoop();

}
