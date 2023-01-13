import cn from  'classnames';
import s from './FinModal.module.css';

function FinModal({isOpen}) {

  return (
    <div className={cn(s.modal, {
        [s.open]: isOpen
    })}>
        
    </div>
  );
}

export default FinModal;


