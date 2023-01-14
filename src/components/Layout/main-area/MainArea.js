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
  const {finModalState, onSetFinModalStat} = useContext(StateContext)

  const Modal = () =>{
    onSetFinModalStat()
  }

  return (
    <div className={cn(s.mainArea)}>
      <PlayArea/>
      <News/>
      <LevelInfo/>
      <Menu Modal={Modal}/>
      <FinModal isOpen={finModalState}/>
    </div>
  );
}

export default MainArea;
