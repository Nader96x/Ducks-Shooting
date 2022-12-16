import {SmallBird, MediumBird, LargeBird} from "./Classes.js";
import {getRandom,totalScore,changeTime,changeName,gameOver,saveData} from "./functions.js";
let birds_arr = [SmallBird, MediumBird, MediumBird, LargeBird];
let bird;
let timer = 60;
function start(level){
    let id = setInterval(() => {
        timer--;
        // console.log('Create New Bird');
        bird = new birds_arr[getRandom(0,birds_arr.length-1)](level);
        changeTime(timer);
        
        if(timer<=0){
            clearInterval(id);
            console.log("Game Over");
            gameOver();
            saveData();
        }
        
        
        // console.log("Timer: ",timer);
        // console.log("totalScore: ",totalScore);
    }, 1000);
    // changeTime(timer);
    // console.log("Base");
}
window.onload = function(){
    let urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get('name');
    let level = Number(urlParams.get('level')) || 1;
    // if (isNaN(level)) {level=1;}
    if (username){
        changeName(username);
        start(level);
    }else{
        window.location.href = "index.html";
    }
}