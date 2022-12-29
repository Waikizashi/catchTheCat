import React, { useState, useContext } from "react";
import cn from  'classnames';
//import PussyConf from "../../mechanic/Pussy";
import getRandomInt from "../../mechanic/getRandomInt";

import cat from "../../img/CatWithOutline.png"
import badCat from "../../img/REDCatWithOutline.png"
import s from './Pussy.module.css'
import { StateContext } from "../../context/stateContext";





function Pussy({pussyConf, rndrState,params}) {
  const {onchangeScore, area} = useContext(StateContext)
  const [conf, setConf] = useState(pussyConf)


  function scoreUp(){
    onchangeScore(10)
  }


  function replace(){
    let top = getRandomInt(area.width*0.1, area.height-area.height*0.1) + 'px'
    let right = getRandomInt(area.width*0.1, area.width-area.width*0.1) + 'px'
    pussyConf.replace(top, right)
    setConf(pussyConf)
    scoreUp(10)
  } 



  if(rndrState){
   return (
   <div style={{
    top: conf.y,
    right: conf.x
   }} onClick={replace} className={cn(s.cat,{
      [s.render]:rndrState
   })}>
      <img style={{width: conf.size}}
        className={s.img} src={cat} alt={'cat'}></img>
   </div>)
  } 
}

export default Pussy;
