import cn from  'classnames';
import { useContext } from 'react';
import { StateContext } from '../../../../context/stateContext';

import s from './Menu.module.css';

function Menu() {
  const {onSetHisState, hiScreenState} = useContext(StateContext)

  const onPause = ()=>{
    console.log("####: ", hiScreenState)
    onSetHisState()
  }

  return (
    <div className={cn(s.menu)}>

      
    <div className={cn(s.btn)}><div>fuck somebody</div></div>

      {/* <div className={cn(s.mainBtns)}> */}
        <div className={cn(s.btn)}><div>reboot</div></div>
        <div className={cn(s.btn)} onClick={onPause}><div>{hiScreenState ? 'pause' : 'start'}</div></div>
      {/* </div> */}

    </div>
  );
}

export default Menu;
