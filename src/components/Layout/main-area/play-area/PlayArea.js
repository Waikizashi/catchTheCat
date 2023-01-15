import cn from  'classnames';
import HiScreen from './hiScreen/HiScreen';

import { useRef, useEffect, useState, useContext } from 'react';

//import Pussy from '../../../turboPussy/Pussy';
//import PussyConf from '../../../../mechanic/Cat';
//import getRandomInt from '../../../../mechanic/getRandomInt';


//import anm from '../../../../css/Animations.module.css'
import s from './PlayArea.module.css';
import { StateContext } from '../../../../context/stateContext';
import Field from './Field';

function PlayArea() {
  const playAreaRef = useRef(null)
  const {area, onSetAreaPlace} = useContext(StateContext)

  //---------------------------------useEffect-----------------------------------------


    
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: area.width*0.5, y: area.height*0.5 });


  const offset = area.width*0.1
  const offsetY = area.height*0.1

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX-offset/2, y: e.clientY-offsetY/2 });
  };

  useEffect( () =>{

    const userAgent = window.navigator.userAgent;
    const mobileRegex = /(android|iphone|ipad|mobile)/i;
    setIsMobile(mobileRegex.test(userAgent));

    const handleResize = () => {
      const {width, height} = playAreaRef.current.getBoundingClientRect()
      onSetAreaPlace({
        height: height,
        width: width
      })

    };
    //console.log("####:" )
    const {width, height} = playAreaRef.current.getBoundingClientRect()
    //console.log(playAreaRef.current.clientHeight)
    //console.log(height)
    onSetAreaPlace({
      height: height,
      width: width
    })

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  //---------------------------------useEffect-----------------------------------------
  
  function start(){
    console.log("START")
    // renderPussy()
  }
  
  //console.log('STATUS',status)


    return (
      <div onMouseMove={isMobile ? null : handleMouseMove}  ref={playAreaRef}  className={cn(s.playArea, /*anm.bordercolors1*/)}>
      <HiScreen onStart={start}/>
      <Field mousePosition={mousePosition} isMobile={isMobile}/>      
      </div>
    );
  
}

export default PlayArea;
