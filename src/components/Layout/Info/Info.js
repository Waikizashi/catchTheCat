import cn from  'classnames';


import anm from '../../../css/Animations.module.css'
import Clock from '../../Time/Clock';
import s from './info.module.css'

function Info() {

  return (
    <div className={cn(s.info)}>
        <div className={cn(s.scoreInfo, anm.textColors)}>
            score: <p className={s.score}>0</p></div>
        <div className={cn(s.lvlMode, anm.textColors)}>
            mode_level: <p className={s.mode}>easy</p></div>
        <div className={cn(s.timeInfo, anm.textColors)}>
            Now: <p className={s.time}> <Clock/> </p></div>
        <div className={cn(s.timerInfo, anm.textColors)}>
            timer: <p className={s.timer}>0:0:0</p></div>
        <section className={cn(s.guls)}>
            <div className={cn(s.gul1)}></div>
            <div className={cn(s.gul2)}></div>
            <div className={cn(s.gul3)}></div>
        </section>
    </div>
  );
}

export default Info;



