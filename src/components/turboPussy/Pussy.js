import React, { useState, useContext } from "react";
import cn from  'classnames';
//import PussyConf from "../../mechanic/Pussy";
import getRandomInt from "../../mechanic/getRandomInt";

import cat from "../../img/CatWithOutline.png"
//import badCat from "../../img/REDCatWithOutline.png"
import s from './Pussy.module.css'
import { StateContext } from "../../context/stateContext";





function Pussy({draggable,pussyConf,onReplace}) {
  const {gameMode, render,onchangeScore, area} = useContext(StateContext)
  const [config, setConfig] = useState(pussyConf)



  function scoreUp(){
    onchangeScore(10)
    onReplace && onReplace()
    replace()
        
  }


  function replace(){
    let top = getRandomInt(area.height*0.1, area.height-area.height*0.1) + 'px'
    let left = getRandomInt(area.width*0.1, area.width-area.width*0.1) + 'px'
    pussyConf.replace(top, left)
    setConfig(pussyConf)

    
  } 

  //const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (event) => {
    //console.log('taken')
    console.log('config:X:', config.x)
    console.log('config:Y:', config.y)
    
    event.target.style.cursor = 'grabbing'
    // code to handle the start of the drag event
  };
  const handleDrag = (event) => 
  {
  };


  const handleDragEnd = (event) => {
    let top = event.clientY-area.height*0.1 + 'px'
    let right = event.clientX-area.width*0.1 + 'px'
    pussyConf.replace(top, right)
    setConfig(pussyConf)
    onchangeScore(10)
    event.target.style.cursor = 'grab'
    console.log('config:X:', config.x)
    console.log('config:Y:', config.y)
    // code to handle the end of the drag event
  };
  //console.log('Pussy')


   if(gameMode === 'relax' || gameMode === 'easy' || gameMode === 'hard'){
    return (
      <div 
       style={{
       top: config.y,
       left: config.x
      }} 
      onClick={scoreUp} 
      className={cn(s.cat,{[s.render]: render})}>
         <img style={{width: config.size}}
           className={s.img} src={cat} alt={'cat'}></img>
      </div>
      )
   }
   else if(gameMode === 'medium' || gameMode === 'extreme'){
    return (
      <div
       draggable={draggable}
       onDragStart={handleDragStart}
       onDrag={handleDrag} 
       onDragEnd={handleDragEnd}
       style={{
       top: config.y,
       left: config.x
      }} className={cn(s.cat,{[s.render]: render})}>
         <img style={{width: config.size}}
           className={s.img} src={cat} alt={'cat'}></img>
      </div>
      )
   }
}

export default Pussy;
