import cn from  'classnames';
import React, { useContext } from "react";
import { StateContext } from '../../../../context/stateContext';

import box from '../../../../img/Box.png'
import s from './Box.module.css';

// function isInteger(value) {
//   return typeof value === "number" && value % 1 === 0;
// }


function Box() {

  const {render} = useContext(StateContext)


  return (
    <div style={{
        bottom: '10px',
        right: '10px'
       }} className={cn(s.box,{[s.render]: render})}>
          <img style={{}}
            className={s.img} src={box} alt={'box'}></img>
       </div>
  );
}

export default Box;
