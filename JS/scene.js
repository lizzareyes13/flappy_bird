function Scene() {
  this.bg = document.getElementById("bg");
  this.xOffset = 0;
}

scene.prototype.update = function(){
  this.xOffset--;

};

scene.prototype.render = function(ctx){
  ctx.drawImage(this.bg, this.xOffset, 0, 400, 600);
}

export default New Scene();
