import cn from  'classnames';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../context/stateContext';


//import anm from '../../../css/Animations.module.css'
import Clock from '../../Time/Clock';
import s from './info.module.css'

function Info() {

    const {finish,
        onSetFinish,
        lvlConf,
        onSetWin, 
        score, 
        gameMode,
        hiScreenState, 
        lvlTime, pause,
        onSetStatus, onSetPause,Modifier} = useContext(StateContext)

//     console.log(finish)
//     console.log(lvlConf)
//     console.log(hiScreenState)
//     console.log(gameMode)
//    console.log(status)
//     console.log(lvlTime)
//     console.log(pause)
//     console.log(localStorage)

    const [timer, setTimer] = useState(lvlTime)

    // const [Score, setScore] = useState(score)


    // useEffect(()=>{
    //     setScore(score)
    // }, [score])

    useEffect(()=>{
    
        onSetStatus(false)
        onSetPause(true)
        if(score >= lvlConf.modes[gameMode].needResult){
            onSetWin(true)
        }else{
            onSetWin(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finish])

    useEffect(()=>{
        setTimer(lvlTime)
    }, [lvlTime])


   
    
    useEffect(()=>{
        if(!hiScreenState === true && pause === false){
            const intervalId = setInterval(() => {
                setTimer(timer - 1);
              }, 1000);


              if(timer <= 0 || 
                score >= parseInt(lvlConf.modes[gameMode].needResult + Modifier*10) ){
                onSetFinish(true)
              }
              localStorage.setItem('lvlTime', timer);
              return () => clearInterval(intervalId);
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer, hiScreenState, lvlTime])

  return (
    <div className={cn(s.info)}>
        <div className={cn(s.scoreInfo, /*anm.textColors*/)}>
            score: <p className={s.score}>{score.toString()}|{(lvlConf.modes[gameMode].needResult + Modifier*10).toString()}</p></div>
        <div className={cn(s.lvlMode, /*anm.textColors*/)}>
            mode_level: <p className={s.mode}>{gameMode}</p></div>
        <div className={cn(s.timeInfo, /*anm.textColors*/)}>
            Now: <p className={s.time}> <Clock/> </p></div>
        <div className={cn(s.timerInfo, /*anm.textColors*/)}>
            timer: <p className={s.timer}>
                {Math.floor(timer/60) ? Math.floor(timer/60) : 0}:{(timer%60) ? (timer%60) : 0}
                </p></div>
        <section className={cn(s.guls)}>
            <div className={cn(s.gul1)}></div>
            <div className={cn(s.gul2)}></div>
            <div className={cn(s.gul3)}></div>
        </section>
    </div>
  );
}

export default Info;



