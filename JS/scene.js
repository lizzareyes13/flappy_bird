function Scene(mw) {
  this.bg = document.getElementById("bg");
  this.xOffset = 0;
  this.maxWidth = mw;
}

Scene.prototype.update = function(){
  if(this.xOffSet <= -450)
    this.xOffset = 0;
  this.xOffset--;

};

Scene.prototype.render = function(ctx){
  for(var i=0; i<=this.maxWidth+450; i+=449)
  ctx.drawImage(this.bg, i+this.xOffset, 0, 450, 600);
}

export default new Scene(1000);
