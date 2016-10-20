import Pipe from "./Pipe.js";


function PipeGenerator(pipes){
  this.pipes = pipes;
  this.generatePipe();
  setInterval(()=>{
    this.generatePipe();
  },3000);
}

          //PipeGenerator function
PipeGenerator.prototype.generatePipe = function(){
    let heightTop = Math.random()*200+50;
    let heightBottom = 600 - heightTop -250;
    let pipeTop = new Pipe (1000, 0, +3, 150, heightTop);
    let pipeBottom = new Pipe (1000, 610-heightBottom, 3, 150, heightBottom);
    this.pipes.push(pipeTop);
    this.pipes.push(pipeBottom);
}

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

export default PipeGenerator;
