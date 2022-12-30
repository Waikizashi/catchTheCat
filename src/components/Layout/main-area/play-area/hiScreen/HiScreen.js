import cn from  'classnames';
import React, { useContext, useState } from "react";
import { StateContext } from '../../../../../context/stateContext';

import s from './hiScreen.module.css';

function isInteger(value) {
  return typeof value === "number" && value % 1 === 0;
}


function HiScreen() {

  

  const {
      onSetHisState,
      hiScreenState,
      onSetStatus,
      onSetMode,
      gameMode,
      onPussyHandle} = useContext(StateContext)

  const [modifier, setModifier] = useState(0)
  

  const clickToStart = () => {
    onPussyHandle(true)
    onSetHisState(false)
    onSetStatus(true)

  };

  function handleChange(event){
    console.log('Modifier value: ',event.target.value)
    if(isInteger(event.target.value)){
      setModifier(0)
    }
    else if(event.target.value >99 ){
      setModifier(99)
    }
    else if(event.target.value <0 ){
      setModifier(0)
    }
    else{
      setModifier(event.target.value)
    }
  }

  function onChoseMode(event){
      console.log(event.target.id)
      onSetMode(event.target.id)
  }


  return (
    <div className={cn(s.hiScreen,{
      [s.closeModal]: !hiScreenState,
      [s.openModal]: hiScreenState
    })}>
            <p className={s.welcome}>Welcome to <span className={s.span}>"Catch the cat"</span> game</p>
            <div className={cn(s.settings)
            }>
                <p className={s.p}>Choose game mode:</p>
                <ul className={s.choseMode}>
                    <li><p id='veryEasy' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'veryEasy'
                    })} onClick={onChoseMode}>very_easy</p></li>
                    <li><p id='easy' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'easy'
                    })} onClick={onChoseMode}>easy</p></li>
                    <li><p id='medium' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'medium'
                    })} onClick={onChoseMode}>medium</p></li>
                    <li><p id='hard' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'hard'
                    })} onClick={onChoseMode}>hard</p></li>
                    <li><p id='Extreme' className={cn(s.menuBtn,{
                      [s.chosen]: gameMode === 'Extreme'
                    })} onClick={onChoseMode}>Extreme</p></li>
                </ul>
                <p className={s.p} >set the modifier (optional):</p>
                <input className={s.extraOption} value={modifier} onChange={handleChange} type="number"/>
            </div>
            <p className={s.start} onClick={clickToStart}> {'<<'} click here to start game {'>>'} </p>
    </div>
  );
}

export default HiScreen;
