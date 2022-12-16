import {getRandom,onBirdClick} from "./functions.js";
let step = 20;
class Boom{
    #id;
    constructor(){
        this.boom = document.createElement("img");
        this.boom.src = "imgs/boom.gif";
        this.boom.classList.add("boom");
        this.boom.width = 150;
        this.boom.height = 150;

        this.boom.style.position = "absolute";
        this.boom.style.left = getRandom(0,window.innerWidth-this.boom.width)+"px";
        this.boom.style.top = 0+"px";
        this.boom.onclick = ()=>{
            clearInterval(this.#id);
            this.top_left = {x:parseInt(this.boom.style.left),y:parseInt(this.boom.style.top)};
            this.bottom_left = {x:parseInt(this.boom.style.left),y:parseInt(this.boom.style.top)+this.boom.height};
            this.top_right = {x:parseInt(this.boom.style.left)+this.boom.width,y:parseInt(this.boom.style.top)};
            this.bottom_right = {x:parseInt(this.boom.style.left)+this.boom.width,y:parseInt(this.boom.style.top)+this.boom.height};
            let birds = document.querySelectorAll("img.bird");
            birds.forEach((bird)=>{
                let top_left = {x:parseInt(bird.style.left),y:parseInt(bird.style.top)};
                let bottom_left = {x:parseInt(bird.style.left),y:parseInt(bird.style.top)+bird.height};
                let top_right = {x:parseInt(bird.style.left)+bird.width,y:parseInt(bird.style.top)};
                let bottom_right = {x:parseInt(bird.style.left)+bird.width,y:parseInt(bird.style.top)+bird.height};
 
                if (
                    (bottom_right.x <= this.top_right.x && bottom_right.x >= this.top_left.x && bottom_right.y<= this.bottom_left.y && bottom_right.y>= this.top_left.y ) ||
                    (top_right.x <= this.top_right.x && top_right.x >= this.top_left.x && top_right.y<= this.bottom_left.y && top_right.y>= this.top_left.y ) ||
                    (bottom_left.x <= this.top_right.x && bottom_left.x >= this.top_left.x && bottom_left.y<= this.bottom_left.y && bottom_left.y>= this.top_left.y ) ||
                    (top_left.x <= this.top_right.x && top_left.x >= this.top_left.x && top_left.y<= this.bottom_left.y && top_left.y>= this.top_left.y )
                    ){
                    bird.click();
                    
                }
            
            
            });
            this.boom.src = "imgs/explosion.gif";
            // console.log("boom");
            setTimeout(()=>{
                console.log("boom");
                this.boom.remove()
            }
            ,1000);
            // console.log("boom");
        };



        document.querySelector("div#container").appendChild(this.boom);
        this.fall();
    }
    moveDown(value){
        // console.log(this .x,value,this.imgObject.width,window.innerWidth);
        let x = parseInt(this.boom.style.top);
        if(x+value+this.boom.height>window.innerHeight){
            x=window.innerHeight-this.boom.height;
        }
        else{x+=value;}
        this.boom.style.top = x + "px";
    }
    fall(){
        this.#id=setInterval(()=>{
            this.moveDown(step);
            let x = parseInt(this.boom.style.top);
            if(x+step+this.boom.height>window.innerHeight){
                this.boom.remove();
                clearInterval(this.#id);
            }
            
            
            
        },100);
    }
    

}
// new Boom();
class Bird {
    #Birdobject;
    #speed;
    #score;
    static #birds = [];
    // static #counter =0;
    constructor(src,size,score,speed=step) {
        if(new.target.name=="Bird")
            throw new Error("Cannot instantiate Bird class directly");
        if(!getRandom(0,10)){
            new Boom();
        }
        this.#Birdobject = document.createElement("img");
        this.#Birdobject.src = src;
        this.#Birdobject.className = "bird";
        this.#Birdobject.width = size;
        this.#Birdobject.score = score;
        this.#Birdobject.height = size;
        this.#Birdobject.style.position = "absolute";
        this.#Birdobject.style.left = "0px";
        
        this.#Birdobject.style.top = getRandom(0,window.innerHeight-parseInt(this.#Birdobject.height)-10)+"px";
        // console.log(0,window.innerHeight,parseInt(this.#Birdobject.height),this.#Birdobject.style.top);
        this.#speed = speed;
        this.#score = score;
        this.#Birdobject.addEventListener("click",onBirdClick);
        document.querySelector("div#container").appendChild(this.#Birdobject);
        Bird.#birds.push(this.#Birdobject);
        this.fly();
        // console.log(getRandom(parseInt(this.#Birdobject.height),window.innerHeight));


        // Bird.#counter++;
    }
    moveRight(value){
        // console.log(this .x,value,this.imgObject.width,window.innerWidth);
        let x = parseInt(this.#Birdobject.style.left);
        if(x+value+this.#Birdobject.width>window.innerWidth){
            x=window.innerWidth-this.#Birdobject.width;
        }
        else{x+=value;}
        this.#Birdobject.style.left = x + "px";
    }
    fly(){
        let id = setInterval(()=> {
            this.moveRight(this.#speed);
            let x = parseInt(this.#Birdobject.style.left);
            if(x+this.#speed+this.#Birdobject.width>window.innerWidth){
                clearInterval(id);
                this.#Birdobject.remove();
            }
        },100);
    }

    static get allBirds(){return Bird.#birds;}
    // static get counter(){return Bird.#counter;}
}
class SmallBird extends Bird {
    constructor(level=1) {
        super("imgs/small.gif",130, level*10,level*step);
    }
}
class MediumBird extends Bird {
    constructor(level=1) {
        super("imgs/medium.gif",200, level*5,level*step);
    }
}
class LargeBird extends Bird {
    constructor(level=1) {
        super("imgs/large.gif",200, level*-10,level*step);
    }
}

// console.log("Classes");
export { SmallBird, MediumBird, LargeBird, Bird };