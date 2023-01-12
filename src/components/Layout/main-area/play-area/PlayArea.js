import cn from  'classnames';
import HiScreen from './hiScreen/HiScreen';

import { useRef, useEffect,  useContext } from 'react';
//import Pussy from '../../../turboPussy/Pussy';
//import PussyConf from '../../../../mechanic/Cat';
//import getRandomInt from '../../../../mechanic/getRandomInt';


//import anm from '../../../../css/Animations.module.css'
import s from './PlayArea.module.css';
import { StateContext } from '../../../../context/stateContext';
import Field from './Field';

function PlayArea() {
  const playAreaRef = useRef(null)
  const {status, onSetAreaPlace} = useContext(StateContext)
  


  //---------------------------------useEffect-----------------------------------------
  
  useEffect(() => {
    const handleResize = () => {
      onSetAreaPlace({
        height: playAreaRef.current.clientHeight,
        width: playAreaRef.current.clientWidth
      })

    };
    
    onSetAreaPlace({
      height: playAreaRef.current.clientHeight,
      width: playAreaRef.current.clientWidth
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
  
  console.log('STATUS',status)


    return (
      <div ref={playAreaRef}  className={cn(s.playArea, /*anm.bordercolors1*/)}>
      <HiScreen onStart={start}/>
      <Field/>      
      </div>
    );
  
}

export default PlayArea;
