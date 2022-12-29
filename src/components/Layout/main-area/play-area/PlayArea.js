import cn from  'classnames';
import HiScreen from './hiScreen/HiScreen';

import anm from '../../../../css/Animations.module.css'
import s from './PlayArea.module.css';

function PlayArea() {
  return (
    <div className={cn(s.playArea, anm.bordercolors1)}>
        <HiScreen/>
    </div>
  );
}

export default PlayArea;
