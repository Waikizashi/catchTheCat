import React, { useState, useEffect, useContext } from "react";
import cn from  'classnames';
//import PussyConf from "../../mechanic/Pussy";
import getRandomInt from "../../mechanic/getRandomInt";

import cat from "../../img/CatWithOutline.png"
//import badCat from "../../img/REDCatWithOutline.png"
import s from './Pussy.module.css'
import { StateContext } from "../../context/stateContext";





function Pussy({pussyConf,onReplace}) {
  const {render,onchangeScore, area} = useContext(StateContext)
  const [config, setConfig] = useState(pussyConf)



  function scoreUp(){
    onchangeScore(10)
    onReplace && onReplace()
    replace()
        
  }


  function replace(){
    let top = getRandomInt(area.height*0.1, area.height-area.height*0.1) + 'px'
    let right = getRandomInt(area.width*0.1, area.width-area.width*0.1) + 'px'
    pussyConf.replace(top, right)
    setConfig(pussyConf)

    
  } 

  console.log('Pussy')


   return (
   <div style={{
    top: config.y,
    right: config.x
   }} onClick={scoreUp} className={cn(s.cat,{[s.render]: render})}>
      <img style={{width: config.size}}
        className={s.img} src={cat} alt={'cat'}></img>
   </div>)
}

export default Pussy;
