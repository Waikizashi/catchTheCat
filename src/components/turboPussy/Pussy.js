import React, { useState, useContext, useEffect, useRef } from "react";
import cn from  'classnames';
import pop from "../../styles/Animation";
//import PussyConf from "../../mechanic/Pussy";

import getRandomInt from "../../mechanic/getRandomInt";
import cat from "../../img/CatWithOutline.png"
import badCat from "../../img/REDCatWithOutline.png"
import redCat from "../../img/BEDCatWithOutline.png"
//import badCat from "../../img/REDCatWithOutline.png"
import s from './Pussy.module.css'
import { StateContext } from "../../context/stateContext";




function Pussy({draggable,config,onReplace, isMobile,dropZone}) {

   //console.log('CONFIG::::', config)

  const {gameMode, hiScreenState,onchangeScore, area} = useContext(StateContext)
  const render = !hiScreenState
  const [cfg, setCfg] = useState(config)
  const [over, setOver] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null);
  const pussyRef = useRef(null);

  //console.log('CONFIG::::', config)

  useEffect(() => {
    
    if (!timeoutId) {
      const id = setTimeout(() => {
        pussyRef.current.style.transition = '.5s'
        replace();
        setTimeoutId(null);
      }, config.type ? getRandomInt(800, 1400) : getRandomInt(500, 800));
      setTimeoutId(id);
    }
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeoutId]);

  // useEffect(()=>{


  // },[isMobile])


  function scoreUp(value){
    onchangeScore(value)
    //onReplace && onReplace()
    replace()
        
  }


  const handleClick = (event) =>{
    //console.log(pussyRef.current)
    pussyRef.current.style.transition = '0s'
    //event.current.style.transition = 'none'
    //console.log(event)
    pop(event, config.type,config.type)
    pop(event, 'shadow',config.type)
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
    let top = getRandomInt(area.height*0.1, area.height-area.height*0.2) + 'px'
    let left = getRandomInt(area.width*0.1, area.width-area.width*0.2) + 'px'
    //config.replace(top, left)
    config.x = left
    config.y = top
    setCfg(config)
    //scoreUp()
    //clearTimeout(catJump)
    onReplace && onReplace()
    
  } 

  //const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (event) => {

    pussyRef.current.style.transition = '0s'
    clearTimeout(timeoutId)
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
    //config.replace(top, left)
    config.x = left
    config.y = top
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
    //console.log(event.dataTransfer.dropEffect)
    // config.replace(top, left)
    config.x = left
    config.y = top
    setCfg(config)
    onReplace && onReplace()

    pop(event, config.type,config.type)
    pop(event, 'shadow',config.type)

    if(event.dataTransfer.dropEffect === 'copy'){
      if(config.type === true){
        
      scoreUp(44)
      }
      else{
        scoreUp(-33)
      }
    }
    setTimeoutId(false)
    event.target.style.cursor = 'grab'
    // code to handle the end of the drag event
  };
  const touchDragEnd = (event) => {
    event.preventDefault()
    //console.log(dropZone.current.style.transform)
    onReplace && onReplace()

    pop(event, config.type,config.type)
    pop(event, 'shadow',config.type)

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
