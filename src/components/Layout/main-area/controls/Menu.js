import cn from  'classnames';
import { useContext } from 'react';
import { StateContext } from '../../../../context/stateContext';

import s from './Menu.module.css';

function Menu() {
  const {status,onSetHisState,onSetStatus, hiScreenState,onPussyHandle} = useContext(StateContext)

  const onPause = ()=>{
   
    onSetHisState()
    onPussyHandle()
    console.log(" ScreenState:  ", hiScreenState)
    console.log(" status:  ", status)
  }
  const onReboot = ()=>{
    //console.log("####: ", hiScreenState)
    onPussyHandle(false)
    onSetHisState(true)
    onSetStatus(false)
  }

  if(status){
    return (
      <div className={cn(s.menu)}>
  
        
      <div className={cn(s.btn)}><div>fuck somebody</div></div>
  
        {/* <div className={cn(s.mainBtns)}> */}
          <div className={cn(s.btn)} onClick={onReboot}><div>reboot</div></div>
          <div className={cn(s.btn)} onClick={onPause}><div>{hiScreenState ? 'start' : 'pause'}</div></div>
        {/* </div> */}
  
      </div>
    );
  }
  else{

    return (
      <div className={cn(s.menu)}>
  
        
      <div className={cn(s.btn)}><div>fuck somebody</div></div>
  
        {/* <div className={cn(s.mainBtns)}> */}
          <div className={cn(s.btn)}><div>...</div></div>
          <div className={cn(s.btn)}><div>...</div></div>
        {/* </div> */}
  
      </div>
    );
  }
}

export default Menu;
