import cn from  'classnames';

import s from './hiScreen.module.css';

function HiScreen() {
  return (
    <div class={s.hiScreen}>
            <p className={s.welcome}>Welcome to "Catch tha cat" game</p>
            <div className={s.settings}>
                <p className={s.p}>Choose game mode:</p>
                <ul className={s.choseMode}>
                    <li><p id='veryEasy' className={cn(s.menuBtn)}>very_easy</p></li>
                    <li><p id='easy' className={cn(s.menuBtn)}>easy</p></li>
                    <li><p id='medium' className={cn(s.menuBtn)}>medium</p></li>
                    <li><p id='hard' className={cn(s.menuBtn)}>hard</p></li>
                    <li><p id='Extreme' className={cn(s.menuBtn)}>Extreme</p></li>
                </ul>
                <p className={s.p} >set the modifier (optional):</p>
                <input className={s.extraOption} value="0" min="0" max="99" type="number"/>
            </div>
            <p className={s.start} > {'<<'} click here to start game {'>>'} </p>
    </div>
  );
}

export default HiScreen;
