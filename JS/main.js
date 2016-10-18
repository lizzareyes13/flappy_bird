const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
import scene from "./scene.js";

window.onload = function(){


  function initGameLoop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    scene.update();
    scene.render(ctx);
    window.requestAnimationFrame(initGameLoop);

  }


  initGameLoop();

}
