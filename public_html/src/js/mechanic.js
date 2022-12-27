const $timer = document.querySelector('#timer')
const mainArea = document.querySelector('.main-area')
const score = document.querySelector('#score')
const redhat = document.querySelector('#redhat')

console.log(playArea.offsetWidth)
console.log(playArea.offsetHeight)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function scoreChange(val){
    let tmp = parseInt(score.innerHTML)
    score.innerHTML = tmp + val
}




let startTime;
let endTime;
let timer;

function startSwatch() {
    redhat.removeEventListener('click',startSwatch)
  startTime = new Date();
  timer = setInterval(updateStopwatch, 1000);
}

function stopStopwatch() {
  endTime = new Date();
  clearInterval(timer);
}

function updateStopwatch() {
  const elapsedTime = new Date() - startTime;
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  $timer.innerHTML = `${hours}:${minutes}:${seconds}`
  //console.log(`${hours}:${minutes}:${seconds}`);
}




redhat.addEventListener('click', ()=>{
    let top = getRandomInt(redhat.offsetHeight*0.7,playArea.offsetHeight-redhat.offsetHeight*0.8)
    let left = getRandomInt(redhat.offsetWidth*0.7,playArea.offsetWidth-redhat.offsetWidth*0.8)

    redhat.style.top = `${top}px`
    redhat.style.left = `${left}px`

    scoreChange(10)
})

redhat.addEventListener('click', startSwatch)