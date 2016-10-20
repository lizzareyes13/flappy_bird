const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
import scene from "./scene.js";
import Bird from "./bird.js";
import PipeGenerator from "./PipeGenerator.js";
const pipes = [];
window.onload = function(){
  let player = new Bird(100,300);
  new PipeGenerator(pipes);
  function initGameLoop(){
    player.detectCollisions(pipes);
    if(!player.dead){
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
    }
    else{
        ctx.drawImage(document.getElementById("gameover"), 250, 160, 500, 280)
        document.getElementById("canvas").onclick = function(){
          location.reload();
        }
    }




    window.requestAnimationFrame(initGameLoop);
  }
  initGameLoop();

}
