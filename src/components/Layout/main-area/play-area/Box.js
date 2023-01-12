import cn from  'classnames';
import React, { useContext } from "react";
import { StateContext } from '../../../../context/stateContext';

import box from '../../../../img/Box.png'
import s from './Box.module.css';

// function isInteger(value) {
//   return typeof value === "number" && value % 1 === 0;
// }


function Box() {

  const {render, area} = useContext(StateContext)
  let size = area.width*0.2 + 'px'

  return (
    <div style={{
        bottom: area.width*0.01-5 + 'px',
        right: area.width*0.01 + 'px'
       }} className={cn(s.box,{[s.render]: render})}>
          <img style={{width:size}}
            className={s.img} src={box} alt={'box'}></img>
       </div>
  );
}

export default Box;
