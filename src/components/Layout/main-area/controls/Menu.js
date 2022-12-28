import cn from  'classnames';

import s from './Menu.module.css';

function Menu() {
  return (
    <div className={cn(s.menu)}>

      
    <div className={cn(s.btn)}><p>fuck somebody</p></div>

      <div className={cn(s.mainBtns)}>
        <div className={cn(s.btn)}><p>...</p></div>
        <div className={cn(s.btn)}><p>...</p></div>
      </div>

    </div>
  );
}

export default Menu;
