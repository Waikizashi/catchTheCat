const time = document.querySelector('#time')
const news = document.querySelector('#news')



news.innerHTML = `
Good morning, Night City! Yesterday's body count ended at a strong thirty!
 Sponsor of the Ten — non-stop street wars in Heywood! 
 Minus one cop, so everyone get ready! 
 The police won't do a damn thing about it! 
 But in Santo Domingo, the lights were cut off. 
 Obviously, the netrunners are frolicking in the power grid again. 
 In Westbrook, "Trauma Tim" scrapes the victims of another cyberpsih off the asphalt. 
 And Pacifica… Well... Pacifica is Pacifica. Stan was with you, as always. 
 A new day is ahead in the city of dreams!
`




function updateClock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    time.innerHTML = `${hours}:${minutes}:${seconds}`;
  }

setInterval(updateClock, 1000);





