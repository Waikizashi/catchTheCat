import cn from  'classnames';
import { useContext } from 'react';
import { StateContext } from '../../../../context/stateContext';

import s from './Menu.module.css';

function Menu() {
  const {status,
    onSetHisState,
    onSetStatus, 
    hiScreenState,
    onPussyHandle,
    onSetTargets,
    onchangeScore,
    onSetLvlTime,
    onSetPause,onSetMode} = useContext(StateContext)

  

  const onPause = ()=>{
    
    onSetHisState(0)
    onPussyHandle()
    onSetPause()
    
    //console.log(" ScreenState:  ", hiScreenState)
    //console.log(" status:  ", status)
  }
  const onReboot = ()=>{
    //console.log("####: ", hiScreenState)
    onSetMode('relax')
    localStorage.clear();
    onPussyHandle(false)
    onSetHisState(true)
    onSetTargets(false)
    onSetStatus(false)
    onchangeScore(0)
    onSetLvlTime(0)
  }
  const onReset = async ()=>{
    await localStorage.clear();
    try {
      const cache = await caches.open('my-cache');
      await cache.delete('/path/to/resource');
      console.log('Cache deleted');
      } catch (error) {
        console.log(error);
      }
    window.location.reload()
  }


  if(status){
    return (
      <div className={cn(s.menu)}>
  
        {/* <div className={cn(s.mainBtns)}> */}
        <div onClick={onReset} className={cn(s.btn)}><div>reset</div></div>
          <div className={cn(s.btn)} onClick={onReboot}><div>restart</div></div>
          <div className={cn(s.btn)} onClick={onPause}><div>{hiScreenState ? 'start' : 'pause'}</div></div>
        {/* </div> */}
  
      </div>
    );
  }
  else{
   
    return (
      <div className={cn(s.menu)}>
  
         
        {/* <div className={cn(s.mainBtns)}> */}
          <div onClick={onReset} className={cn(s.btn)}><div>reset</div></div>
          <div className={cn(s.btn)}><div>...</div></div>
          <div className={cn(s.btn)}><div>...</div></div>
        {/* </div> */}
  
      </div>
    );
  }
}

export default Menu;
