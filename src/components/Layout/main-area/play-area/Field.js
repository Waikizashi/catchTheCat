import cn from  'classnames';
import {useState,  useContext, useEffect} from 'react';
import s from './Field.module.css';
import { StateContext } from '../../../../context/stateContext';

import Pussy from '../../../turboPussy/Pussy';
import PussyConf from '../../../../mechanic/Cat';
import Box from './Box';


function Field({isMobile,mousePosition}) {
  
  const {render, gameMode, status, area} = useContext(StateContext)
  //console.log("Field")

  //console.log(area)
  const top = area.height*0.5 + 'px'
  const ac_MOVY = area.height*0.5
  const left = area.width*0.5 + 'px'
  const ac_MOVX = area.width*0.5
  const size = area.width*0.1 + 'px'
  const offset = area.width*0.1
  const offsetY = area.height*0.1
  
  
  const config = new PussyConf([top,left,size])

  
  const [rndr, setRndr] = useState(false)


  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  //const [z, setZ] = useState(0);


  useEffect(() => {

      if (window.DeviceMotionEvent) {
        //console.log('DeviceMotionEvent is supported');
      window.addEventListener('devicemotion', handleDeviceMotion,false);
    } else {
      //alert('DeviceMotionEvent is not supported')
      console.log('DeviceMotionEvent is not supported');
    }
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const clipPathId = 'my-clip-path';
  //const [mousePosition, setMousePosition] = useState({ x: area.width*0.5, y: area.height*0.5 });


  const Replace = () =>{
    setRndr(!rndr)
  }
  
  function handleDeviceMotion(event) {
   
    
 
    const newx = event.accelerationIncludingGravity.x*offsetY*(-1)
    const newy = event.accelerationIncludingGravity.y*offsetY
 
        setX(x+newx);
        setY(y+newy);

  }

  // const handleMouseMove = (e) => {
  //   setMousePosition({ x: e.clientX-offset/2, y: e.clientY-offsetY/2 });
  // };

    
  if(gameMode === 'relax'){
    return (
        <div className={cn({
          [s.field]:render,
          [s.render]:render
          })}>
        
            {
              status ? 
              <Pussy onReplace={Replace} config={config}/> : null
              
            }
        </div>
      );
}
else  if(gameMode === 'easy'){
    return (
        <div className={cn({
          [s.field]:render,
          [s.render]:render,
          })}>
        
            {
              status ? 
              <Pussy onReplace={Replace} config={config}/> : null
              
            }
        </div>
      );
}
else  if(gameMode === 'medium'){
    return (
        <div className={cn({
          [s.field]:render,
          [s.render]:render,
          })}>
        
            {
              status ? 
              <Pussy isMobile={isMobile} onReplace={Replace} draggable={true} config={config}/> : null
              
            }
            <Box isMobile={isMobile}/>
        </div>
      );
}
else if(gameMode === 'hard'){
    return (
     
        <div /*onMouseMove={isMobile ? null : handleMouseMove} */style={render ? {clipPath: 'url(#my-clip-path)'} : null} className={cn( 
            {
            [s.field]: render,
            [s.render]: render
            })}>
        
        <svg style={{position: 'absolute', width: offset*2}} >
          <defs>
            <clipPath id={clipPathId}>
              <circle style={isMobile? {transition:'.1s'}:null}
              cx={isMobile ? parseInt(ac_MOVX+x) : mousePosition.x} 
              cy={isMobile ? parseInt(ac_MOVY+y) : mousePosition.y} 
              r={isMobile ? offset*2 : offset} />
            </clipPath>
          </defs>
        </svg>
        {
              status ? 
              <Pussy isMobile={isMobile} config={config}/> : null
              
            }
            
            </div>
            
            
      );
}
else if(gameMode === 'extreme'){
    return (
        <div /*onMouseMove={isMobile ? null : handleMouseMove} */
        style={render ? {clipPath: 'url(#my-clip-path)'} : null} 
        className={cn( 
            {
            [s.field]: render,
            [s.render]: render
            })}>
        
        <svg style={{position: 'absolute', width: offset*2}} >
          <defs>
            <clipPath id={clipPathId}>
              <circle style={isMobile? {transition:'.1s'}:null}
              cx={isMobile ? parseInt(ac_MOVX+x) : mousePosition.x} 
              cy={isMobile ? parseInt(ac_MOVY+y) : mousePosition.y} 
              r={isMobile ? offset*2 : offset} />
              <rect x={area.width-offset*2.2} y={area.height-offset*1.8} width={offset*2.3+'px'} height={offset*1.8+'px'} />
            </clipPath>
          </defs>
        </svg>
           
        {
              status ? 
              <Pussy isMobile={isMobile} onReplace={Replace} config={config}/> : null
              
            }
            <Box isMobile={isMobile}/>
            </div>
      );
}

}

export default Field;




