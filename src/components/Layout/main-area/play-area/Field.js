import cn from  'classnames';
import {useState,  useContext, useEffect} from 'react';
import s from './Field.module.css';
import { StateContext } from '../../../../context/stateContext';
//import getRandomInt from '../../../../mechanic/getRandomInt';
import Pussy from '../../../turboPussy/Pussy';
//import PussyConf from '../../../../mechanic/Cat';
import Box from './Box';




function Field({isMobile,mousePosition}) {
  
  const {render, gameMode, area, targets} = useContext(StateContext)
  const [dropZone, setDropZone] = useState(0)
  //console.log("Field")

  //console.log(area)
  // const top = getRandomInt(area.height*0.1, area.height-area.height*0.15) + 'px'
   const ac_MOVY = area.height*0.5
  // const left = getRandomInt(area.height*0.1, area.height-area.height*0.10) + 'px'
   const ac_MOVX =area.width*0.5
  // const size = area.width*0.1 + 'px'
   const offset = area.width*0.1
   const offsetY = area.height*0.1
  //const [top, setTop] = useState( getRandomInt(area.height*0.1, area.height-area.height*0.15) + 'px')
  //const [ac_MOVY, setACMOVY] = useState(area.height*0.5)
  //const [left, setLeft] = useState(getRandomInt(area.width*0.1, area.width-area.width*0.1) + 'px')
  //const [ac_MOVX, setACMOVX] = useState(area.width*0.5)
  //const [size, setSize] = useState(area.width*0.1 + 'px')
  //const [offset, setOffset] = useState(area.width*0.1)
  //const [offsetY, setOffsetY] = useState(area.height*0.1)
  
  
  // useEffect(()=>{
  //   //setTop(getRandomInt(area.height*0.1, area.height-area.height*0.15) + 'px')
  //   //setACMOVY(area.height*0.5)
  //   //setLeft(getRandomInt(area.width*0.1, area.width-area.width*0.1) + 'px')
  //   //setACMOVX(area.width*0.5)
  //   //setSize(area.width*0.1 + 'px')
  //   setOffset(area.width*0.1)
  //   setOffsetY(area.height*0.1)
  // },[area])


  //const config = new PussyConf([top,left,size,1])
  //console.log(targets)



  
  const [rndr, setRndr] = useState(false)


  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  // const x = mousePosition.x
  // const y = mousePosition.y

  // const delay =  setTimeout(()=>{
  //   let tmpx = x +2
  //   let tmpy = y+2
  //   setX(tmpx)
  //   setY(tmpy)
  //   clearTimeout(delay)
  // },500)
  //const [z, setZ] = useState(0);


  useEffect(() => {

      if (window.DeviceMotionEvent) {
        console.log('DeviceMotionEvent is supported');
      window.addEventListener('devicemotion', handleDeviceMotion,false);
    } else {
      alert('DeviceMotionEvent is not supported')
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

    const hadleSetDropZone = (new_dropZone)=>{
      // console.log('ZONE:',new_dropZone.current.getBoundingClientRect())
      setDropZone(new_dropZone)
    }  


  if(gameMode === 'relax'){
    //console.log(targets)
    return (
        <div className={cn({
          [s.field]:render,
          [s.render]:render
          })}>
        
            {

              targets.map((item, index)=>(
                //console.log(item)
                <Pussy key={item.id} onReplace={Replace} config={item}/>
              ))

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
              targets.map((item, index)=>(
                //console.log(item)
                <Pussy key={item.id} onReplace={Replace} config={item}/>
                
                
              ))
              
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

              targets.map((item, index)=>(
                //console.log(item)
                <Pussy key={item.id} dropZone={isMobile ? dropZone : undefined} isMobile={isMobile} onReplace={Replace} draggable={true} config={item}/>
              ))
              // status ? 
              // <Pussy dropZone={isMobile ? dropZone : undefined} isMobile={isMobile} onReplace={Replace} draggable={true} config={config}/> : null
              
            }
            <Box dropZone={isMobile ? hadleSetDropZone: undefined} isMobile={isMobile}/>
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

              targets.map((item, index)=>(
                //console.log(item)
                <Pussy key={item.id} /*dropZone={isMobile ? dropZone : undefined}*/ isMobile={isMobile} onReplace={Replace} draggable={true} config={item}/>
              ))
              // targets.map((item, index)=>(
              //   //console.log(item)
              //   <Pussy key={item.id} onReplace={Replace} config={item}/>
              // ))
              // status ? 
              //  <Pussy dropZone={isMobile ? dropZone : undefined} isMobile={isMobile} onReplace={Replace} config={targets[0]}/> : null
              
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

            targets.map((item, index)=>(
                //console.log(item)
                <Pussy key={item.id} dropZone={isMobile ? dropZone : undefined} isMobile={isMobile} onReplace={Replace} draggable={true} config={item}/>
              ))
              // status ? 
              // <Pussy dropZone={isMobile ? dropZone : undefined} isMobile={isMobile} onReplace={Replace} config={config}/> : null
              
            }
            <Box dropZone={isMobile ? hadleSetDropZone: undefined} isMobile={isMobile}/>
            </div>
      );
}

}

export default Field;




