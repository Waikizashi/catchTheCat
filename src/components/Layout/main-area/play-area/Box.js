import cn from  'classnames';
import { useContext, useRef, useEffect, useState } from "react";
import { StateContext } from '../../../../context/stateContext';

import box from '../../../../img/Box.png'
import s from './Box.module.css';

// function isInteger(value) {
//   return typeof value === "number" && value % 1 === 0;
// }


function Box({isMobile}) {

  const {render, area} = useContext(StateContext)
  const [over, setOver] = useState(false)
  const boxRef = useRef(null)

  let size = area.width*0.2-10 + 'px'



  const handleDragOver = (event)=>{
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setOver(true)
  }
  const handleDragLeave = (event)=>{
    event.preventDefault();
    setOver(false)
    console.log("Leaved the Drop area")
  }

  const handleDragEnter = (event) => {
    // Do something with the event
    
    console.log("Entered the Drop area")
  }

  useEffect(()=>{
    boxRef.current.addEventListener('dragenter', handleDragEnter);
        return ()=>{
          if(boxRef.current){
            boxRef.current.removeEventListener('dragenter', handleDragEnter);
          }
        }
  },[boxRef])

  return (
    <div 
    onDragOver={isMobile ? null : handleDragOver}
    onDragLeave={isMobile ? null : handleDragLeave}
    ref={boxRef} 
    style={{
        padding: `${area.width*0.01}px ${area.width*0.01}px ${ area.width*0.01-5}px ${area.width*0.01}px`,
        bottom: area.width*0.01-5 + 'px',
        right: 0 + 'px'
       }} className={cn(s.box,{
        [s.render]: render
        })}>
          <img style={{width:size}}
            className={cn(s.img,{
              [s.hover]: over})} src={box} alt={'box'}></img>
       </div>
  );
}

export default Box;
