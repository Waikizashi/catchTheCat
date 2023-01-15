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
  const {area, onSetAreaPlace, hiScreenState, gameMode} = useContext(StateContext)

  


    
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: area.width*0.5, y: area.height*0.5 });
  const [rndr, setRndr] = useState(false)

  const [offset, setOffset ]= useState(area.width*0.1)
  const [offsetY, setOffsetY ]= useState(area.height*0.1)

  const handleMouseMove = (e) => {

     setMousePosition({ x: e.clientX-offset/2, y: e.clientY-offsetY/2 });
  };


  //---------------------------------useEffect-----------------------------------------

  useEffect( () =>{
    
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /(android|iphone|ipad|mobile)/i;
    setIsMobile(mobileRegex.test(userAgent));

    const handleResize = () => {
      // const {width, height} = playAreaRef.current.getBoundingClientRect()
      const width = playAreaRef.current.clientWidth
      const height = playAreaRef.current.clientHeight
      onSetAreaPlace({
        height: height,
        width: width
      })

    };
    //console.log("####:" )
    // const {width, height} = playAreaRef.current.getBoundingClientRect()
    const width = playAreaRef.current.clientWidth
    const height = playAreaRef.current.clientHeight

    onSetAreaPlace({
      height: height,
      width: width})
      //console.log('init area size',area)
    window.addEventListener("resize", handleResize);
    setOffset(area.width*0.1)
    setOffsetY(area.height*0.1)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerHeight, window.innerWidth]);
  
  //---------------------------------useEffect-----------------------------------------
  
  function start(){
    //console.log("START")
    if(area.height>= (window.innerHeight-(window.innerHeight*0.1))){
      const width = playAreaRef.current.clientWidth
      const height = playAreaRef.current.clientHeight

    onSetAreaPlace({height: height,width: width})
    setRndr(!rndr)
    }
    // window.dispatchEvent(new Event('resize'));
    // renderPussy()
  }
  
  //console.log('window.innerHeight',playAreaRef.current)


    return (
      <div
      onMouseMove={isMobile ? null : (!hiScreenState && (gameMode === 'hard' || gameMode === 'extreme')) ? handleMouseMove : null}  
      ref={playAreaRef}  
      className={cn(s.playArea, /*anm.bordercolors1*/)}>
      <HiScreen onStart={start}/>
      <Field mousePosition={mousePosition} isMobile={isMobile}/>      
      </div>
    );
  
}

export default PlayArea;
