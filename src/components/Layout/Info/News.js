import cn from  'classnames';

import anm from '../../../css/Animations.module.css'
import s from './News.module.css';

function News() {

    const newstext = `
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

  return (
    <div className={cn(s.newsLine,/* anm.bc2*/)}>
        <p className={cn(s.marquee)}>{newstext}</p>
    </div>    
  );
}

export default News;



