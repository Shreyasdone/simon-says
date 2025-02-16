let gameSeq = [];
let userSeq = [];
let colors = ["red","yellow","green","purple"];

let started = false;
let level = 0;
let highestScore = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", ()=>{
  if(!started) {
    started = true;
    levelUp();
  }
})

let levelUp = () => {
  userSeq = [];
  h2.innerText = `Level ${++level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randCol = colors[randIdx];
  let randBtn = document.querySelector(`.${randCol}`);
  gameSeq.push(randCol);
  console.log(gameSeq);
  gameFlash(randBtn);
} 

let gameFlash = (btn) => {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

let userFlash = (btn) => {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

let check = (idx) => {
  if(userSeq[idx] == gameSeq[idx]) {
    if(userSeq.length == gameSeq.length) {
      setTimeout(levelUp,500);
    }
  } else {
    highestScore = Math.max(highestScore,level);
    h2.innerHTML = `Game Over! Your score is <b>${level}<b> <br> Press any key to start <br> <b>highest score: ${highestScore}<b>`;
    reset();
  }
}

let reset = ()=>{

  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

// this prints window and not btn since it is an arrow function which has lexical scope
/*let clickBtn = () => {
  console.log(this);
}*/

function clickBtn() {
  let btn = this;
  let clickedCol = btn.getAttribute("id");
  userSeq.push(clickedCol);
  userFlash(btn);
  check(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
  btn.addEventListener("click",clickBtn);
}