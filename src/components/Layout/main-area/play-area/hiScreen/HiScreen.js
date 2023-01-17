import cn from  'classnames';
import { useContext, useRef, useState, useEffect } from "react";
import { StateContext } from '../../../../../context/stateContext';

import s from './hiScreen.module.css';

function isInteger(value) {
  return typeof value === "number" && value % 1 === 0;
}


function HiScreen({onStart}) {

  const {score,
      onSetHisState,
      hiScreenState,
      onSetStatus,
      onSetPause,
      onSetMode,
      gameMode,
      onPussyHandle,
      Modifier,
      onSetUpModifier,
      onSetTargets,
      status,
      onSetLvlTime,onchangeScore} = useContext(StateContext)

  //const [mod, setMod] = useState(0)
  const hiScreenRef = useRef(null);
  const [display, setDisplay] = useState(hiScreenState)
  

  useEffect(()=>{
    //console.log('hisstate', hiScreenState)
    //console.log('hiScreenRef', hiScreenRef.current.style.display)
      setDisplay(hiScreenState)
    }, [hiScreenState])

  const clickToStart = () => {
    onStart && onStart()
    onPussyHandle(true)
    onSetHisState(0)
    onSetStatus(true)
    onSetPause(false)
    //console.log(status)
    if(status === 'true' || status === true){
      onSetTargets(null)
    }
    else{
      onSetTargets(true)
    }
    
  };

  function handleChange(event){
    //console.log('Modifier value: ',event.target.value)
    if(isInteger(event.target.value)){
      //setMod(1)
      onSetUpModifier(1)
    }
    else if(event.target.value >12 ){
      //setMod(12)
      onSetUpModifier(12)
    }
    else if(event.target.value <1 ){
      //setMod(1)
      onSetUpModifier(1)
    }
    else{
      //setMod(event.target.value)
      onSetUpModifier(event.target.value)
    }
  }
  //console.log(status)
  function onChoseMode(event){
      //console.log("####:",status,score)
      if((status === false || status === 'false') && (score === 0 || score === '0')){
      onSetLvlTime(event.target.id)
      onSetMode(event.target.id)
      localStorage.setItem('mode', event.target.id);
      }
      else if((status !== true || status !== 'true') && (score !== 0 || score !== '0')){
        // eslint-disable-next-line no-restricted-globals
        const userResponse = confirm("If you switch the MODE now, you will LOSE all progress! Do you want to continue?");
        if(userResponse){

          localStorage.clear();
          onPussyHandle(false)
          onSetTargets(false)
          onSetStatus(false)
          onchangeScore(0)
          onSetLvlTime(event.target.id)
          onSetMode(event.target.id)
          localStorage.setItem('mode', event.target.id);
        }
      }
  }


  return (
    // <div style={hiScreenState ? {display: 'flex'}:{display: 'none'}} ref={hiScreenRef} className={cn(s.hiScreen,{
    <div style={hiScreenState ? {display: 'flex'}: null} ref={hiScreenRef} className={cn(s.hiScreen,{
      [s.closeModal]: !display,
      [s.openModal]: display
    })}>
            <p className={s.welcome}>Welcome to <span className={s.span}>"Catch the cat"</span> game</p>
            <div className={cn(s.settings)
            }>
                <p className={s.p}>Choose game mode:</p>
                <ul className={s.choseMode}>
                    <li><p id='relax' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'relax'
                    })} onClick={onChoseMode}>relax</p></li>
                    <li><p id='easy' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'easy'
                    })} onClick={onChoseMode}>easy</p></li>
                    <li><p id='medium' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'medium'
                    })} onClick={onChoseMode}>medium</p></li>
                    <li><p id='hard' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'hard'
                    })} onClick={onChoseMode}>hard</p></li>
                    <li><p id='extreme' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'extreme'
                    })} onClick={onChoseMode}>Extreme</p></li>
                </ul>
                <p className={s.p} >set the modifier (optional):</p>
                <input className={s.extraOption} value={Modifier} onChange={handleChange} type="number"/>
            </div>
            <p className={s.start} onClick={clickToStart}> {'<<'} click here to start game {'>>'} </p>
    </div>
  );
}

export default HiScreen;
