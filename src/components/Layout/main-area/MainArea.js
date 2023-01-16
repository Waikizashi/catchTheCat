import cn from  'classnames';
import LevelInfo from '../../../mechanic/LevelInfo';
import News from '../Info/News';
import s from './MainArea.module.css';
import PlayArea from './play-area/PlayArea';
import Menu from './controls/Menu'
import FinModal from '../../../mechanic/FinModal';

function MainArea() {
  //console.log('Main')


  return (
    <div className={cn(s.mainArea)}>
      <PlayArea/>
      <News/>
      <LevelInfo/>
      <Menu/>
      <FinModal/>
    </div>
  );
}

export default MainArea;
