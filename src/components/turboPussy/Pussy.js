import React, { useState, useContext, useEffect, useRef } from "react";
import cn from  'classnames';
//import PussyConf from "../../mechanic/Pussy";

import getRandomInt from "../../mechanic/getRandomInt";
import cat from "../../img/CatWithOutline.png"
import badCat from "../../img/REDCatWithOutline.png"
import redCat from "../../img/BEDCatWithOutline.png"
//import badCat from "../../img/REDCatWithOutline.png"
import s from './Pussy.module.css'
import { StateContext } from "../../context/stateContext";






function Pussy({draggable,config,onReplace, isMobile,dropZone}) {
  const {gameMode, render,onchangeScore, area} = useContext(StateContext)
  const [cfg, setCfg] = useState(config)
  const [over, setOver] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null);
  const pussyRef = useRef(null);

  //console.log('CONFIG::::', config)



  useEffect(() => {
    if (!timeoutId) {
      const id = setTimeout(() => {
        replace();
        setTimeoutId(null);
      }, 1000)//getRandomInt(800,1300));
      setTimeoutId(id);
    }
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeoutId]);

  useEffect(()=>{


  },[isMobile])
  //console.log('ZONE:',dropZone.current.getBoundingClientRect())
  // jmp[config.id] = setTimeout(() => {
  //   replace()
  // }, config.type ? getRandomInt(500,3000) : getRandomInt(400, 800))


  function scoreUp(value){
    onchangeScore(value)
    //onReplace && onReplace()
    replace()
        
  }


  const handleClick = () =>{
    console.log(config.type)
    if(config.type === true){
      scoreUp(12)
    }
    else{scoreUp(-9)}
  }


  
//area.width*0.2-10
  // const $config.id = setTimeout(() => {
  //   replace()
    
  // }, config.type ? getRandomInt(500,3000) : getRandomInt(400, 800))

  function replace(){
    let top = getRandomInt(area.height*0.1, area.height-area.height*0.15) + 'px'
    let left = getRandomInt(area.width*0.1, area.width-area.width*0.1) + 'px'
    config.replace(top, left)
    setCfg(config)
    //scoreUp()
    //clearTimeout(catJump)
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

    const { clientX, clientY } = event.touches[0];
    const zoneCords = dropZone.current.getBoundingClientRect()
    let top = clientY-area.height*0.1 + 'px'
    let left = clientX-area.width*0.1 + 'px'
    config.replace(top, left)
    setCfg(config)
    onReplace && onReplace()
    if (clientX >= zoneCords.left && 
      clientX <= zoneCords.right && 
      clientY >= zoneCords.top && 
      clientY <= zoneCords.bottom) {
        dropZone.current.style.transform = 'scale(1.05)'
      setOver(true);
    } 
    else {
      dropZone.current.style.transform = 'scale(1)'
      setOver(false);
    }

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
      if(config.type === true){
        
      scoreUp(44)
      }
      else{
        scoreUp(-33)
      }
    }
    event.target.style.cursor = 'grab'
    // code to handle the end of the drag event
  };
  const touchDragEnd = (event) => {
    event.preventDefault()
    //console.log(dropZone.current.style.transform)
    onReplace && onReplace()
    if(over){
      dropZone.current.style.transform = 'scale(1)'
      if(config.type === true){
        
        scoreUp(27)
        }
        else{
          scoreUp(-19)
        }
    }
    event.target.style.cursor = 'grab'
    //scoreUp()
    // code to handle the end of the drag event
  };


   if(gameMode === 'relax' || gameMode === 'easy' || gameMode === 'hard'){
    return (
      <div 
      ref={pussyRef}
       style={{
       top: cfg.y,
       left: cfg.x
      }} 
      onClick={handleClick} 
      className={cn(s.cat,{[s.render]: render})}>
         <img style={{width: cfg.size}}
           className={s.img} src={config.type ? cat : redCat} alt={'cat'}></img>
      </div>
      )
   }
   else if(gameMode === 'medium'){
    return (
      <div
      ref={pussyRef}
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
   else if(gameMode === 'extreme'){
    return (
      <div
      ref={pussyRef}
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
           className={s.img} src={config.type ? cat : badCat} alt={'cat'}></img>
      </div>
      )
   }
}

export default Pussy;
