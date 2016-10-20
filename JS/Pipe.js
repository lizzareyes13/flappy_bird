function Pipe(x,y, speed, width, height){
this.x = x;
this.y = y;
this.speed = speed;
this.width = width;
this.height = height;

}
Pipe.prototype.update = function(){
 this.x -= this.speed;
}

Pipe.prototype.render = function(ctx){
  if(this.y){
  ctx.drawImage(document.getElementById("pipe1"),this.x, this.y, this.width, this.height);
  }
  else{
    ctx.drawImage(document.getElementById("pipe2"),this.x, this.y, this.width, this.height);
  }
  //  ctx.save();
  //  ctx.fillStyle = "#936dbc";
  //  ctx.fillRect(this.x, this.y, this.width, this.height);
  //  ctx.restore();
}

export default Pipe;
