import cn from  'classnames';
import {useState,  useContext } from 'react';
import s from './Field.module.css';
import { StateContext } from '../../../../context/stateContext';
import Pussy from '../../../turboPussy/Pussy';
import PussyConf from '../../../../mechanic/Cat';
import Box from './Box';


function Field() {
  const {render, gameMode, status, area} = useContext(StateContext)
  


  const top = area.height*0.5 + 'px'
  const right = area.width*0.5 + 'px'
  let size = area.width*0.1 + 'px'
  const offset = area.width*0.1
  
  const pussyConfig = new PussyConf([top,right,size])

  const clipPathId = 'my-clip-path';
  const [mousePosition, setMousePosition] = useState({ x: area.height*0.5, y: area.width*0.5 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX-offset/2, y: e.clientY-offset/2 });
    //console.log({ x: e.clientX, y: e.clientY })
  };

    
  if(gameMode === 'relax'){
    return (
        <div className={cn({
          [s.field]:render,
          [s.render]:render
          })}>
        
            {
              status ? 
              <Pussy pussyConf={pussyConfig}/> :
                          render ? <Pussy pussyConf={pussyConfig}/> : null
              
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
              <Pussy pussyConf={pussyConfig}/> :
                          render ? <Pussy pussyConf={pussyConfig}/> : null
              
            }
            <Box/>
        </div>
      );
}
else if(gameMode === 'hard'){
    return (
        <div onMouseMove={handleMouseMove} style={render ? {clipPath: 'url(#my-clip-path)'} : null} className={cn( 
            {
            [s.field]: render,
            [s.render]: render
            })}>
        
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
            </div>
      );
}

}

export default Field;




