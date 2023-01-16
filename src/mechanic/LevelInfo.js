import cn from  'classnames';
import { useContext, useState, useEffect } from 'react';
import { StateContext } from '../context/stateContext';

import s from './LvlInfo.module.css';

function LevelInfo() {
  const {lvlConf, gameMode} = useContext(StateContext)
  const [descr, setDescr] = useState('Hello, today you have to catch cats!')
//console.log(lvlConf['modes'][gameMode].description)
  
useEffect(()=>{
  //console.log(lvlConf['modes'][gameMode].description)
  setDescr(lvlConf['modes'][gameMode].description)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[gameMode])


  return (
    <div className={cn(s.Logs)}>
       <p>{descr}</p> 
    </div>
  );
}

export default LevelInfo;


