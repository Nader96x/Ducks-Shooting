import {Bird} from "./Classes.js";
function getRandom(min=0, max=window.innerHeight) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveData(){
  let plays = JSON.parse(localStorage.getItem("plays")) || {};
  let name = document.querySelector("span#name").innerHTML;
  let score = Number(document.querySelector("span#score").innerHTML);
  let max_score = 0;
  // console.log(plays);
  // console.log(plays[name.toLocaleLowerCase()]);
  if (name.toLocaleLowerCase() in plays && "max_score" in plays[name.toLocaleLowerCase()]){
    max_score = plays[name.toLocaleLowerCase()].max_score;
  }
  if (Number(score) > max_score){
    max_score = Number(score);
  }
  // plays.push({namee:{date:new Date().toString().split(" GMT")[0],score}});
  plays[name.toLocaleLowerCase()]= {date:new Date().toString().split(" GMT")[0],score,max_score};
  localStorage.setItem("plays",JSON.stringify(plays));
}

function gameOverDiv(){
  let div = document.createElement("div");
  div.id = "Over";
  div.classList.add("game");
  div.innerHTML = "<p>Game Over</p>";
  document.querySelector("body").appendChild(div);
  let plays = JSON.parse(localStorage.getItem("plays")) || {};
  let name = document.querySelector("span#name").innerHTML;
  let score = Number(document.querySelector("span#score").innerHTML);
  if (score >=50){
    div.innerHTML += `<p>Congratulations <span style="color:orange">${name}</span> You Won with Score ${score}</p>`;
    div.innerHTML += `<img width=200 src="imgs/dancing_duck.gif" alt="win">`;
  }else{
    div.innerHTML += `<p>Sorry <span style="color:orange">${name}</span> You Lost</p>`;
    div.innerHTML += `<img width=250  src="imgs/sad_duck.gif" alt="win">`;
  }
  if (name.toLocaleLowerCase() in plays){
    let lastScore = plays[name.toLocaleLowerCase()]['score'];
    let lastDate = plays[name.toLocaleLowerCase()]['date'];
    let max_score = plays[name.toLocaleLowerCase()]['max_score'];
    div.innerHTML += `<p style="color:white">Your Last Score: <span style="color:chartreuse">${lastScore}</span> on ${lastDate}</p>`;
    if (score >max_score){max_score = score;}
    div.innerHTML += `<p style="color:white">Your Max Score: <span style="color:chartreuse">${max_score}</span></p>`;
  }
  div.innerHTML += `<p><a href="">Play Again</a></p>`;
}
function changeScore(value){
    document.querySelector("span#score").innerHTML= value;
}
function changeName(name){
  document.querySelector("span#name").innerHTML= name;
}


// async function changeTime(timer){
//   while (timer--){
//     let minutes = Math.floor(timer/60);
//     let seconds = timer%60;
//     document.querySelector("span#timer").innerHTML= `${minutes}:${seconds}`;
//     await(new Promise(resolve => setTimeout(resolve, 1000)));
//   }
// }
function changeTime(timer){
  if (timer<=0) {timer=0;}
  let minutes = Math.floor(timer/60);
  let seconds = timer%60;
  document.querySelector("span#timer").innerHTML= `${minutes}:${seconds}`;
}
function changeKilled(){
  document.querySelector("span#killed").innerHTML= totalkilled;
}

function gameOver(){
  // console.log("Game Over");
  // console.log(Bird.allBirds);
  for(let bird in Bird.allBirds){
    // console.log(Bird.allBirds[bird]);
    Bird.allBirds[bird].remove();
  }
  for(let boom of document.querySelectorAll("img.boom")){
    // console.log(Bird.allBirds[bird]);
    boom.remove();
  }
  
  gameOverDiv();

  // document.querySelector("span#gameOver").innerHTML= "Game Over";
}

// console.log("Functions");
let totalScore = 0;
let totalkilled = 0;
function onBirdClick(event) {
    totalScore+=event.target.score;
    if (totalScore<0) {totalScore=0;}
    event.target.remove();
    totalkilled += 1
    changeScore(totalScore);
    changeKilled();
    // console.log(event.target,event.target.score,totalScore);
}

function capitalize(name){
  let words = []
  for(let word of name.split(" ")){
      //console.log(word);
      words.push(word[0].toUpperCase() + word.slice(1));
  }
  //console.log(words);
  return words.join(" ");
}

function check_name(nameError,_name){
  let flag = 0;
  if(!_name){
      nameError.style.visibility = "visible";
      nameError.innerHTML="Required"
      flag=1;
  }

  else{
      nameError.style.visibility = "hidden";
      
  }
  return flag;
}


export { getRandom, onBirdClick, totalScore, changeName, changeTime, gameOver,saveData,capitalize,check_name };