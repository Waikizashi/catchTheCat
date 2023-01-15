import React, { useState, useContext } from "react";
import cn from  'classnames';
//import PussyConf from "../../mechanic/Pussy";

import getRandomInt from "../../mechanic/getRandomInt";
import cat from "../../img/CatWithOutline.png"
//import badCat from "../../img/REDCatWithOutline.png"
import s from './Pussy.module.css'
import { StateContext } from "../../context/stateContext";





function Pussy({draggable,config,onReplace, isMobile}) {
  const {gameMode, render,onchangeScore, area} = useContext(StateContext)
  const [cfg, setCfg] = useState(config)


  function scoreUp(value){
    onchangeScore(value)
    //onReplace && onReplace()
    replace()
        
  }


  function replace(){
    let top = getRandomInt(area.height*0.1, area.height-area.height*0.1) + 'px'
    let left = getRandomInt(area.width*0.1, area.width-area.width*0.1) + 'px'
    config.replace(top, left)
    setCfg(config)
    //scoreUp()
    onReplace && onReplace()
    
  } 

  //const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (event) => {

    
    event.target.style.cursor = 'grabbing'
    // code to handle the start of the drag event
  };
  const touchDragStart = (event) => {
    event.stopPropagation();
    
    
    event.target.style.cursor = 'grabbing'
  };
  const handleDrag = (event) => 
  {
    
  };
  const touchDrag = (event) => 
  {
    //window.addEventListener("touchmove", touchDrag, { passive: false });
    //event.stopPropagation();
    const { clientX, clientY } = event.touches[0];
    let top = clientY-area.height*0.1 + 'px'
    let left = clientX-area.width*0.1 + 'px'
    config.replace(top, left)
    setCfg(config)
    onReplace && onReplace()
  };

  
  const handleDragEnd = (event) => {
    event.preventDefault()
    let top = event.clientY-area.height*0.1 + 'px'
    let left = event.clientX-area.width*0.1 + 'px'
    console.log(event.dataTransfer.dropEffect)
    config.replace(top, left)
    setCfg(config)
    onReplace && onReplace()

    if(event.dataTransfer.dropEffect === 'copy'){
      scoreUp(50)
    }
    event.target.style.cursor = 'grab'
    // code to handle the end of the drag event
  };
  const touchDragEnd = (event) => {
    event.preventDefault()
    onReplace && onReplace()
    
    //scoreUp()
    // code to handle the end of the drag event
  };


   if(gameMode === 'relax' || gameMode === 'easy' || gameMode === 'hard'){
    return (
      <div 
       style={{
       top: cfg.y,
       left: cfg.x
      }} 
      onClick={replace} 
      className={cn(s.cat,{[s.render]: render})}>
         <img style={{width: cfg.size}}
           className={s.img} src={cat} alt={'cat'}></img>
      </div>
      )
   }
   else if(gameMode === 'medium' || gameMode === 'extreme'){
    return (
      <div
      onTouchStart={isMobile ? touchDragStart : null}
      onTouchMove={isMobile ? touchDrag : null}
      onTouchEnd={isMobile ? touchDragEnd : null}
       draggable={draggable}
       onDragStart={isMobile ? null : handleDragStart}
       onDrag={isMobile ? null : handleDrag} 
       onDragEnd={isMobile ? null : handleDragEnd}
       style={{
       top: cfg.y,
       left: cfg.x
      }} className={cn(s.cat,{[s.render]: render})}>
         <img style={{width: cfg.size}}
           className={s.img} src={cat} alt={'cat'}></img>
      </div>
      )
   }
}

export default Pussy;
