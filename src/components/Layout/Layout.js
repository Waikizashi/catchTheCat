import cn from  'classnames';
import Info from './Info/Info';

import s from './layout.module.css';
import MainArea from './main-area/MainArea';

function Layout() {
  return (
    <div className={cn(s.wrap)}>
        <Info></Info>
        <MainArea/>
        <footer className={s.footer}>
            <p className={s.p}>Dream team &copy; 2022 December...</p>
        </footer>
    </div>
  );
}

export default Layout;
