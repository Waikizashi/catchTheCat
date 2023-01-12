import cn from  'classnames';
import HiScreen from './hiScreen/HiScreen';
import { useRef, useEffect, useState,  useContext } from 'react';

import Pussy from '../../../turboPussy/Pussy';
import PussyConf from '../../../../mechanic/Cat';
import getRandomInt from '../../../../mechanic/getRandomInt';

import anm from '../../../../css/Animations.module.css'
import s from './PlayArea.module.css';
import { StateContext } from '../../../../context/stateContext';
import Field from './Field';

function PlayArea() {
  const playAreaRef = useRef(null)
  // const {gameMode, render, area, onSetAreaPlace} = useContext(StateContext)
  const {render,status, onSetAreaPlace, area} = useContext(StateContext)
  


  const top = area.height*0.5 + 'px'
  const right = area.width*0.5 + 'px'
  let size = area.width*0.1 + 'px'
  const offset = area.width*0.1
  

  const clipPathId = 'my-clip-path';
  const pussyConfig = new PussyConf([top,right,size])

  const [mousePosition, setMousePosition] = useState({ x: top, y: right });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX-offset/2, y: e.clientY-offset/2 });
    //console.log({ x: e.clientX, y: e.clientY })
  };

  //---------------------------------useEffect-----------------------------------------
  
  useEffect(() => {
    const handleResize = () => {
      onSetAreaPlace({
        height: playAreaRef.current.clientHeight,
        width: playAreaRef.current.clientWidth
      })

      //console.log('HEIGHT: ', playAreaRef.current.clientHeight)
      //console.log('WIDTH: ', playAreaRef.current.clientWidth)
      // Do something when the window is resized
    };
    
    onSetAreaPlace({
      height: playAreaRef.current.clientHeight,
      width: playAreaRef.current.clientWidth
    })
    //console.log('HEIGHT: ', playAreaRef)
    //console.log('WIDTH: ', playAreaRef.clientWidth)
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  //---------------------------------useEffect-----------------------------------------
  
  function start(){
    console.log("START")
    // renderPussy()
  }
  
  console.log('STATUS',status)

  
    // const renderPussy = ()=>{
    //   const start = setInterval(()=>{
    //     console.log('NEW-CAT')
    //     let top = getRandomInt(area.width*0.1, area.height-area.height*0.1) + 'px'
    //     let right = getRandomInt(area.width*0.1, area.width-area.width*0.1) + 'px'
    //     pussyConfig.replace(top, right)
    //   },1000)
    // }
    return (
      <div ref={playAreaRef}  className={cn(s.playArea, /*anm.bordercolors1*/)}>
      <HiScreen onStart={start}/>
      <Field/>
      {/* <div style={{clipPath: 'url(#my-clip-path)'}} className={cn(s.field)}>
      
      <svg style={{position: 'absolute'}} >
        <defs>
          <clipPath id={clipPathId}>
            <circle cx={mousePosition.x} cy={mousePosition.y} r={offset} />
          </clipPath>
        </defs>
      </svg>

          
          
          {
            status ? 
            <Pussy pussyConf={pussyConfig}/> :
                        render ? <Pussy pussyConf={pussyConfig}/> : null
            
          }
      </div> */}
      
      </div>
    );
  
}

export default PlayArea;


// status ? 
//             <Pussy pussyConf={pussyConfig}/> :
//                         render ? <Pussy pussyConf={pussyConfig}/> : null
            