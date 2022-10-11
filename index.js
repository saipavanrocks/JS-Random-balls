const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleArray = [];


const mouse = {
    x: undefined,
    y: undefined,
   
    
}

canvas.addEventListener('click', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;

    //No of balls generating and pushing instance of particle class
    for(let i=0; i<20; i++){
        particleArray.push(new Particle())  
    }

})


class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;

        // this.x = canvas.width/2;
        // this.y = canvas.height/2;

        this.size = Math.random() * 20 + 1;

        this.speedX = Math.random() * 10 - 1.5;

        this.speedY = Math.random()* 10 - 1.5;
          
    }

    //updating positions
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
       

        // collision detection
        if(this.x + this.speedX > canvas.width - this.size || this.x + this.speedX < this.size){
            this.speedX =- this.speedX;
        } 

        if(this.y  + this.speedY > canvas.height - this.size || this.y + this.speedY < this.size){
            this.speedY =- this.speedY;
        } 
    }
    
    //drawing circle
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.randomColor();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        //ctx.arc()
        ctx.fill();
        ctx.closePath();

    }
    
    //generating random color
    randomColor() {
        return (
          "rgba(" +
          Math.round(Math.random() * 250) +
          "," +
          Math.round(Math.random() * 250) +
          "," +
          Math.round(Math.random() * 250) +
          "," +
          Math.ceil(Math.random() * 10) / 10 +
          ")"
        );
      }
} 

function handler(){
    for(let i=0; i<particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();

    }
}

 

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handler();
    requestAnimationFrame(animate);
}

animate();