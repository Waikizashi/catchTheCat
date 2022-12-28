import cn from  'classnames';

import s from './LvlInfo.module.css';

function LevelInfo() {
  return (
    <div className={cn(s.Logs)}>
        <p>Just click to increase the score</p>
    </div>
  );
}

export default LevelInfo;


