import cn from  'classnames';
import { useContext, useState, useEffect } from 'react';
import { StateContext } from '../context/stateContext';

import s from './LvlInfo.module.css';

function LevelInfo() {
  const {lvlConf, gameMode} = useContext(StateContext)
  const [descr, setDescr] = useState(lvlConf['modes'][gameMode].description)
//console.log(descr)
  
useEffect(()=>{
  setDescr(lvlConf['modes'][gameMode].description)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[gameMode])


  return (
    <div className={cn(s.Logs)}>
       <p>{descr.toString()}</p> 
    </div>
  );
}

export default LevelInfo;


