import cn from  'classnames';
import HiScreen from './hiScreen/HiScreen';
import { useRef,useEffect, useContext } from 'react';
import Pussy from '../../../turboPussy/Pussy';
import PussyConf from '../../../../mechanic/Cat';

import anm from '../../../../css/Animations.module.css'
import s from './PlayArea.module.css';
import { StateContext } from '../../../../context/stateContext';

function PlayArea() {
  const playAreaRef = useRef(null)
  // const {gameMode, render, area, onSetAreaPlace} = useContext(StateContext)
  const {render,status, onSetAreaPlace, area} = useContext(StateContext)
  
  const top = area.height*0.5 + 'px'
  const right = area.width*0.5 + 'px'
  const size = area.width*0.1 + 'px'
  
  const pussyConfig = new PussyConf([top,right,size])


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

  console.log('PlayArea',render,status, area)

  if(status){
    
    return (
      <div ref={playAreaRef} className={cn(s.playArea, anm.bordercolors1)}>
          <HiScreen/>
          {
            <Pussy pussyConf={pussyConfig}/>
          }
      </div>
    );
  }
  else{
    return (
      <div ref={playAreaRef} className={cn(s.playArea, anm.bordercolors1)}>
          <HiScreen/>
          {render ? <Pussy pussyConf={pussyConfig}/> : null}
          
      </div>
    );
  }
}

export default PlayArea;
