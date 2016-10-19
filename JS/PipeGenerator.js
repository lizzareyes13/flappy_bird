import Pipe from "./Pipe.js";

function generatePipe(pipes){
  let heightTop = Math.random()*100+200;
  let heightBottom = 600 - heightTop -150;
  let pipeTop = new Pipe (1000, 0, +3, 150, heightTop);
  let pipeBottom = new Pipe (1000, 600-heightBottom, 3, 150, heightBottom);
  pipes.push(pipeTop);
  pipes.push(pipeBottom);
  console.log(pipes);
}

export default generatePipe;
