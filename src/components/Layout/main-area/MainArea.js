import cn from  'classnames';
import LevelInfo from '../../../mechanic/LevelInfo';
import News from '../Info/News';
import React, {useContext} from "react";
import s from './MainArea.module.css';
import PlayArea from './play-area/PlayArea';
import Menu from './controls/Menu'
import FinModal from '../../../mechanic/FinModal';
import { StateContext } from '../../../context/stateContext';

function MainArea() {
  //console.log('Main')
  const {onSetFinModalState} = useContext(StateContext)

  const Modal = (value) =>{
    onSetFinModalState(value)
  }

  return (
    <div className={cn(s.mainArea)}>
      <PlayArea/>
      <News/>
      <LevelInfo/>
      <Menu Modal={Modal}/>
      <FinModal isOpen={Modal}/>
    </div>
  );
}

export default MainArea;
