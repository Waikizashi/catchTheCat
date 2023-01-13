import React, { useState, useContext, useEffect } from "react";
import cn from  'classnames';
//import PussyConf from "../../mechanic/Pussy";

import getRandomInt from "../../mechanic/getRandomInt";
import cat from "../../img/CatWithOutline.png"
//import badCat from "../../img/REDCatWithOutline.png"
import s from './Pussy.module.css'
import { StateContext } from "../../context/stateContext";





function Pussy({draggable,config,onReplace}) {
  const {gameMode, render,onchangeScore, area} = useContext(StateContext)
  const [cfg, setCfg] = useState(config)
  //console.log("|||||:",config)
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /(android|iphone|ipad|mobile)/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);



  function scoreUp(){
    onchangeScore(10)
    //onReplace && onReplace()
    //replace()
        
  }


  function replace(){
    let top = getRandomInt(area.height*0.1, area.height-area.height*0.1) + 'px'
    let left = getRandomInt(area.width*0.1, area.width-area.width*0.1) + 'px'
    config.replace(top, left)
    setCfg(config)
    scoreUp()
    onReplace && onReplace()
    
  } 

  //const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (event) => {
    //console.log('taken')
    console.log('Drag')
    console.log('config:X:', cfg.x)
    console.log('config:Y:', cfg.y)
    
    event.target.style.cursor = 'grabbing'
    // code to handle the start of the drag event
  };
  const touchDragStart = (event) => {
    //console.log('taken')
    //const { clientX, clientY } = event.touches[0];
    //console.log('Drag')
    //console.log('config:X:', clientX)
    //console.log('config:Y:', clientY)
    
    event.target.style.cursor = 'grabbing'
    // code to handle the start of the drag event
  };
  const handleDrag = (event) => 
  {
    event.preventDefault()
    
  };
  const touchDrag = (event) => 
  {
    
    const { clientX, clientY } = event.touches[0];
    let top = clientY-area.height*0.1 + 'px'
    let left = clientX-area.width*0.1 + 'px'
    config.replace(top, left)
    setCfg(config)
    onReplace && onReplace()
    //console.log('moving')
    //onRerender()
    
    // pussyConf.replace(top, right)
    // setConfig(pussyConf)
    //onchangeScore(10)
  };


  const handleDragEnd = (event) => {
    event.preventDefault()
    let top = event.clientY-area.height*0.1 + 'px'
    let left = event.clientX-area.width*0.1 + 'px'

    config.replace(top, left)
    setCfg(config)
    onReplace && onReplace()
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
