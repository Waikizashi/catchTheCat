import cn from  'classnames';
import {useState,  useContext} from 'react';
import s from './Field.module.css';
import { StateContext } from '../../../../context/stateContext';

import Pussy from '../../../turboPussy/Pussy';
import PussyConf from '../../../../mechanic/Cat';
import Box from './Box';


function Field() {
  const {render, gameMode, status, area} = useContext(StateContext)
  //console.log("Field")

  //console.log(area)
  const top = area.height*0.5 + 'px'
  const left = area.width*0.5 + 'px'
  const size = area.width*0.1 + 'px'
  const offset = area.width*0.1
  const offsetY = area.height*0.1
  

  // useEffect( () =>{
  //   //console.log('Area changed', area)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [area]);
  
  const config = new PussyConf([top,left,size])


  
  //const [config, setConfig] = useState({x: left, y:top, size:size})
  const [rndr, setRndr] = useState(false)


  //console.log("pussyConfig:",pussyConfig)
  //console.log("configG:",configG)


  const clipPathId = 'my-clip-path';
  const [mousePosition, setMousePosition] = useState({ x: area.height*0.5, y: area.width*0.5 });

  const Replace = () =>{
    setRndr(!rndr)
    // console.log(Top, "::::",Left)
    // // pussyConfig.replace(top, left)
    // // setConfig(pussyConfig) 
    // setConfig({x: Left, y:Top, size:size}) 
  }
  
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX-offset/2, y: e.clientY-offsetY/2 });
  };

    
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
else  if(gameMode === 'medium'){
    return (
        <div className={cn({
          [s.field]:render,
          [s.render]:render,
          })}>
        
            {
              status ? 
              <Pussy onReplace={Replace} draggable={true} config={config}/> : null
              
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
        
        <svg style={{position: 'absolute', width: offset*2}} >
          <defs>
            <clipPath id={clipPathId}>
              <circle cx={mousePosition.x} cy={mousePosition.y} r={offset} />
            </clipPath>
          </defs>
        </svg>
        {
              status ? 
              <Pussy config={config}/> :
                          render ? <Pussy config={config}/> : null
              
            }
            </div>
      );
}
else if(gameMode === 'extreme'){
    return (
        <div onMouseMove={handleMouseMove} style={render ? {clipPath: 'url(#my-clip-path)'} : null} className={cn( 
            {
            [s.field]: render,
            [s.render]: render
            })}>
        
        <svg style={{position: 'absolute', width: offset*2}} >
          <defs>
            <clipPath id={clipPathId}>
              <circle cx={mousePosition.x} cy={mousePosition.y} r={offset} />
              <rect x={area.width-offset*2.3} y={area.height-offset*1.8} width={offset*2.3+'px'} height={offset*1.8+'px'} />
            </clipPath>
          </defs>
        </svg>
        {
              status ? 
              <Pussy onReplace={Replace} config={config}/> :
                          render ? <Pussy config={config}/> : null
              
            }
            <Box/>
            </div>
      );
}

}

export default Field;




