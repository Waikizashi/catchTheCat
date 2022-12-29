
export default function getRandomInt(min, max) {

        //console.log("$$$$", min)
        //console.log("$$$$", max)
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }